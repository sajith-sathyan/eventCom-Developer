import React from "react";
import axiosInstance from "../../../Helper/axiosInstance";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
function MyApp(props) {
  const { user } = props;
  console.log("props--->", user);
  const navigate = useNavigate();
  // get the user id from local storage
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  const userId = localStorage.getItem("userId");
  // dicrypt the userid
  if (userId) {
    const decryptedKey = CryptoJS.AES.decrypt(
      userId || "no-user-id",
      secretKey
    );
    var decryptedUserId = decryptedKey.toString(CryptoJS.enc.Utf8);
  } else {
    var decryptedUserId = null;
  }
  const LogOut = async () => {
    const LogOut = async (UserId) => {
      const { data } = await axiosInstance.post(
        "/userLogOut",
        { UserId },
        { withCredentials: true }
      );

      if (data) {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login");
      }
    
    };
    LogOut(decryptedUserId)
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div class="xl:w-10/12 w-full px-8">
          <div class="xl:px-24">
            <div class="mt-16 lg:flex justif    y-between border-b border-gray-200 pb-16">
              <div class="w-80">
                <div class="flex items-center">
                  <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Personal Information
                  </h1>
                </div>
                {/* <p class="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p> */}
              </div>
              <div>
                <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  {user && (
                    <div class="md:w-64">
                      <label
                        class="text-sm leading-none text-gray-800"
                        id="firstName"
                      >
                        Username
                      </label>
                      <input
                        type="name"
                        value={user.username}
                        tabindex="0"
                        class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                        aria-labelledby="firstName"
                        placeholder="John"
                      />
                    </div>
                  )}
                </div>
                <div class="md:flex items-center lg:ml-24 mt-8">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="emailAddress"
                    >
                      Email address
                    </label>
                    {user && (
                      <input
                        type="email"
                        value={user.email}
                        tabindex="0"
                        class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                        aria-labelledby="emailAddress"
                        placeholder="youremail@example.com"
                      />
                    )}
                  </div>

                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="phone"
                    >
                      Phone number
                    </label>
                    {user && (
                      <input
                        type="name"
                        value={user.mobile}
                        tabindex="0"
                        class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                        aria-labelledby="phone"
                        placeholder="123-1234567"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
              <div class="w-80">
                <div class="flex items-center">
                  <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Security
                  </h1>
                </div>
                <p class="mt-4 text-sm leading-5 text-gray-600">
                  Information about the section could go here and a brief
                  description of how this might be used.
                </p>
              </div>
              <div>
                <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="password"
                    >
                      Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="securityCode"
                    >
                      Security Code
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="securityCode"
                      placeholder="Enter your security code"
                    />
                  </div>
                </div>
                <div class="md:flex items-center lg:ml-24 mt-8">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="recoverEmail"
                    >
                      Recovery Email address
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="recoveryEmail"
                      placeholder="Your recovery email"
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="altPhone"
                    >
                      Alternate phone number
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="altPhone"
                      placeholder="Your alternate phone number"
                    />
                  </div>
                </div>
                <button
                  className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500 text-xs"
                  onClick={LogOut}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyApp;
