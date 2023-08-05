import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "../Button/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { loggedUser } from "../../../features/user";
import { useDispatch } from "react-redux";
import { fetchUserDetails, decryptUserId } from "../../../Helper/Helper";

const Navbar2 = (props) => {
  const dispatch = useDispatch();
  const [userCheck, setUserCheck] = useState(null);

  const [logiedUser, setLoggiedUser] = useState(null);
  const [profile, setProfile] = useState(false);

  const { userId, hideCreateEvent } = props;

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const user = useSelector((state) => state.user.value);
  console.log("user--******-->", user);
  console.log("===******==>", user.username);


  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  

  useEffect(() => {
   

    try {
      const fetchUser = async (userId) => {
        try {
          const userData = await fetchUserDetails(userId, dispatch);
          setLoggiedUser(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUser(userId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // redirect to login
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // log out form cooike
  const logOut = () => {
    const LogOut = async(userId)=>{
      const {data} = await axiosInstance.post("/userLogOut",{userId},{withCredentials:true})

      if(data){
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    
        navigate("/login");
      }
    }
   
    LogOut(userId)
    
  };

  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const handleShow = () => {
    setProfile(!profile);
  };
  // get the user id from local storage
  const userID = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;

  // dicrypt the userid
  const decryptedUserId = decryptUserId(userID, secretKey);
  console.log("decryptedUserId----->", decryptedUserId);
  const userRedux = useSelector((state) => state.user.value);
  console.log("userRedux--->", userRedux);
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleClickOutside = () => {
  //   setIsOpen(false);
  // };
  // move to account page

  const moveToProfile = () => {
    const path = `/account/${decryptedUserId}`;
    navigate(path);
  };

  const pathToHome = () => {
    navigate("/");
  };
  return (
    <section>
      <div className="sticky top-0 z-30 w-full px-2 py-0 bg-white sm:px-4 shadow-xl">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div
            onClick={pathToHome}
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800"
          >
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              {/* <ion-icon name="logo-ionic"></ion-icon> */}
            </span>
            EventCom
          </div>

          <div
            onClick={toggleMenu}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {user && user.userId  ? (
              <Link to="/manage/create">
                <p className="md:ml-8 text-sm md:my-0 my-7">Create Event</p>
              </Link>
            ) : null}

            <Link to="/organizations/home">
              {" "}
              <p className="md:ml-8 text-sm md:my-0 my-7">
                {user && user.userId   ? "Manage Events" : null}
              </p>
            </Link>

            <Link to="/Your-Tickets">
              {" "}
              <p className="md:ml-8 text-sm md:my-0 my-7">
                {user && user.userId  ? "Tickets" : null}
              </p>
            </Link>
           
            <Link to={`/account/${user.userId }`  }>
              {" "}
              <p className="md:ml-8 text-sm md:my-0 my-7 text-red-500">
                {user && user.userId  ? user.username   : null}
              </p>
            </Link>

            {user && user.userId ? (
              <div
                aria-haspopup="true"
                className="cursor-pointer flex items-center justify-end relative pl-4"
                onClick={() => setProfile(!profile)}
              > 
                {profile ? (
                  <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 ">
                    <li
                      onClick={moveToProfile}
                      className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={12} cy={7} r={4} />
                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <span className="ml-2">My Profile</span>
                      </div>
                    </li>
                    <li
                      onClick={logOut}
                      className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-help"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={12} cy={12} r={9} />
                        <line x1={12} y1={17} x2={12} y2="17.01" />
                        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                      </svg>
                      <span className="ml-2">Log Out</span>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
                {/* <img
                  className="rounded-full h-10 w-10 object-cover"
                  src="https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"
                  alt="avatar"
                /> */}
                <p className="text-red-500">
                  {" "}
                  {logiedUser  != null  ? logiedUser.username : ""}
                </p>
              </div>
            ) : (
              <button
                className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500 text-xs"
                onClick={handleLoginRedirect}
              >
                logIn
              </button>
            )}
          </ul>
        </div>
        <style jsx>{`
          @media screen and (min-width: 768px) {
            .nav-links {
              position: static !important;
              height: auto !important;
              display: flex !important;
              margin-left: auto !important;
              width: auto !important;
              background: none !important;
              top: auto !important;
              left: auto !important;
              padding: 0 !important;
              opacity: 1 !important;
              visibility: visible !important;
              z-index: auto !important;
            }

            .nav-links li {
              margin: 0 2rem;
            }

            .nav-links a {
              font-size: 1.1rem;
            }
          }
        `}</style>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Navbar2;

// <div className="relative inline-block">
//   {/* Dropdown toggle button */}
//   <button
//     onClick={toggleDropdown}
//     className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
//   >
//     <span className="mx-1">Jane Doe</span>
//     <svg
//       className="w-5 h-5 mx-1"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
//         fill="currentColor"
//       ></path>
//     </svg>
//   </button>

//   {/* Dropdown menu */}
//   {isOpen && (
//     <div
//       onClick={handleClickOutside}
//       className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
//     >
//       <a
//         href="#"
//         className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         <img
//           className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
//           src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
//           alt="jane avatar"
//         />
//         <div className="mx-1">
//           <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
//             Jane Doe
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             janedoe@exampl.com
//           </p>
//         </div>
//       </a>

//       <hr className="border-gray-200 dark:border-gray-700" />

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         view profile
//       </a>

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Settings
//       </a>

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Keyboard shortcuts
//       </a>

//       <hr className="border-gray-200 dark:border-gray-700" />

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Company profile
//       </a>

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Team
//       </a>

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Invite colleagues
//       </a>

//       <hr className="border-gray-200 dark:border-gray-700" />

//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Help
//       </a>
//       <a
//         href="#"
//         className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//       >
//         Sign Out
//       </a>
//     </div>
//   )}
// </div>;
