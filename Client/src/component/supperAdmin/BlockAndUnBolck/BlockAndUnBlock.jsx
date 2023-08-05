import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BlockAndUnBlock(props) {
  const { showBlockPopUp, UserId, CurrStatus } = props;
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  const QrCodeClick = () => {
    showBlockPopUp(false);
  };
  const BlockUser = () => {
    console.log("BlockUser----->")
    try {
      const BlockUser = async (userID) => {
        try {
          const { data } = await axiosInstance.post(
            "/admin/BlockUser",
            { userID: userID },
            { withCredentials: true }
          );
          if (data.response) {
            console.log(data);
            window.location.reload()
          }
        } catch (err) {
          console.log(err);
        }
      };
      

      const UnBlockUser = async (userID) => {
        console.log("UnBlockUser")
        try {
          const { data } = await axiosInstance.post(
            "/admin/Unblock",
            { userID: userID },
            { withCredentials: true }
          );
          if (data.response) {
            console.log(data);
            window.location.reload()
          }
        } catch (err) {
          console.log(err);
        }
      };

      if (CurrStatus === "active") {
        BlockUser(UserId);
      }
      if (CurrStatus === "Blocked") {
        UnBlockUser(UserId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("UserId-->", UserId);
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="text-lg font-medium text-gray-800">
                Block And Unblock
              </h4>
              <button
                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                onClick={QrCodeClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p className="font-bold text-lg text-red-600 ">Warning:</p>
              <p className="text-yellow font-small text-center text-sm mt-4">
                Blocking or unblocking popups may impact user browsing
                experience. while allowing popups may pose security risks.
                Proceed only if you are confident in your decision and fully
                understand the possible consequences.
              </p>
              <br />
              <div className="flex justify-center">
                {CurrStatus === "active" && (
                  <button
                    onClick={BlockUser}
                    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    Block
                  </button>
                )}
                {CurrStatus === "Blocked" && (
                  <button
                    onClick={BlockUser}
                    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </div>

            <br />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default BlockAndUnBlock;
