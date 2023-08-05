import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import GoogleImg from "../../../assets/5a35540277d9e6.8445514415134443544909.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../config/firebase.config";
import { useDispatch } from "react-redux";
import { loggedUser } from "../../../features/user";

function LoginForm() {
  const dispatch = useDispatch();
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // vlidating email address
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const baseURL = process.env.REACT_APP_BASE_URL;
    // Create an Axios instance
    const axiosInstance = axios.create({
      baseURL: baseURL,
    });
  // localStorage.removeItem("accessToken");
  // localStorage.removeItem("refreshToken");
  // submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValid = validateEmail(values.email);

    if (!emailValid) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        "/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          console.log("errors---->",errors)
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          console.log(data);
          const { accessToken, refreshToken } = data;
          console.log("data.Status---------->", data);
          const user = {
            userId: data.user.id,
            username: data.user.username,
            mobile: data.user.mobile,
            email: data.user.email,
            status: data.user.status,
            accessToken: accessToken,
          };
          // Dispatch action to update user state in Redux
          localStorage.setItem("userId", data.user.id);
          dispatch(loggedUser(user));

          console.log("accessToken----->", accessToken);
          console.log("refreshToken----->", refreshToken);
          // Store tokens securely (e.g., in local storage or cookie)
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Make subsequent API requests with the access token in headers
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  //-------------------------------------   firbase auth ------------------------//

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.getItem("auth", "true");
        getTokenVerity(userCred);
      }
    });
  };

  const validateUser = async (token) => {
    const res = await axiosInstance.post(
      "/google",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // if (res.data) {
    //     if (res.data.error) {
    //         console.log(res.data.error)
    //     } else {
    //         console.log("go to home page")
    //     }
    // }

    return res.data;
  };

  const getTokenVerity = async (userCred) => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.getItem("auth", "true");
          validateUser(token).then((data) => {
            console.log(data);
            setUser(data);
            if (data.error) {
              console.log(data.error);
            } else {
              console.log(data);
              const { accessToken, refreshToken } = data;
              console.log("data.Status---------->", data);
              const user = {
                userId: data.user.id,
                username: data.user.username,
                mobile: data.user.mobile,
                email: data.user.email,
                status: data.user.status,
                accessToken: accessToken,
              };
              // Dispatch action to update user state in Redux
              localStorage.setItem("userId", data.user.id);
              dispatch(loggedUser(user));

              console.log("accessToken----->", accessToken);
              console.log("refreshToken----->", refreshToken);
              // Store tokens securely (e.g., in local storage or cookie)
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);

              // Make subsequent API requests with the access token in headers
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              navigate("/");
              
            }
          });
        });
      } else {
        setAuth(false);
        window.localStorage.getItem("auth", "false");
        setUser(null);
      }
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* left side */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Welcome back hello world </span>
              <span className="font-light text-gray-400 mb-8">
                Welcom back! Please enter your details
              </span>
              {/* <form onSubmit={handleSubmit}> */}
              <div className="py-0">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="py-3">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  id="pass"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between w-full py-4">
                {/* <span className="font-bold text-md">Forgot password</span> */}
              </div>
              <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-sky-500 hover:text-black hover:border hover:border-gray-300">
                Log in
              </button>
              <button
                onClick={loginWithGoogle}
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-sky-500 hover:text-black hover:border hover:border-gray-300"
              >
                <img
                  src={GoogleImg}
                  alt="img"
                  className="w-6 h-6 inline mr-2"
                />
                Sign in with Google
              </button>
              <div className="text-center text-gray-400">
                Dont'have an account?
                <span className="font-bold text-black">
                  Sign up for free? <Link to="/register"> Register </Link>
                </span>
              </div>
              {/* </form> */}
            </div>
            {/* right side */}
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"
                alt="img"
                className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              />
              <div class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                <span class="text-white text-xl">
                  We've been uesing Untitle to kick"
                  <br />
                  start every new project and can't <br />
                  imagine working without it."
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default LoginForm;
