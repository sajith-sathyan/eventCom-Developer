import React, { useState } from "react";

export default function index() {
  const [show, setshow] = useState(false);
  return (
    <div className="bg-gray-300">
      <div className="2xl:container 2xl:mx-auto  lg:px-7 sm:px-6 py-6 px-4">
        <nav>
          <div className=" flex flex-row justify-between">
            <div className=" flex space-x-3 items-center">
              <svg
                width={34}
                height={34}
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                  fill="#1F2937"
                />
              </svg>
              <h1 className=" font-normal text-2xl leading-6 text-gray-800">
                EventCom
              </h1>
            </div>
            {/* For large (i.e. desktop and laptop sized screen) */}
            <div className="lg:flex hidden flex-auto justify-between flex-row">
              <div className="flex flex-row lg:space-x-3 xl:space-x-4">
                {/* Vertical Line */}
                <div className=" h-full w-0 border-l border-gray-300" />
              </div>
            </div>
            <div className=" hidden sm:flex xl:pl-4 lg:pl-3 justify-end flex-row sm:space-x-4 md:space-x-6 lg:space-x-3 xl:space-x-4">
              <div className="flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-800 bg-gray-300 hover: underline; focus:outline-none duration-150 justify-center items-center">
                <p>Dashboard</p>
              </div>
              <div className="flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-800 bg-gray-300 text-decoration-line: underline; focus:outline-none hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Event</p>
              </div>
              <div className="flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-800 bg-gray-300 text-decoration-line: underline; focus:outline-none hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Statitics</p>
              </div>
              <button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-800 bg-white focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Preview</p>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.583496 6.99998C0.583496 6.99998 2.91683 2.33331 7.00016 2.33331C11.0835 2.33331 13.4168 6.99998 13.4168 6.99998C13.4168 6.99998 11.0835 11.6666 7.00016 11.6666C2.91683 11.6666 0.583496 6.99998 0.583496 6.99998Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-800 bg-white focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Publish</p>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.91683 4.66667L7.00016 1.75L4.0835 4.66667"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 1.75V8.75"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Save button */}
            </div>
            {/* Burger Icon */}
            <div
              id="bgIcon"
              onClick={() => setshow(!show)}
              className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  block sm:hidden cursor-pointer"
            >
              <svg
                className={`${show ? "hidden" : ""}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className=" transform duration-150"
                  d="M4 6H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className=" transform duration-150"
                  d="M4 18H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className={`${show ? "block" : "hidden"}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* for medium-sized devices */}
          <div className="lg:hidden flex flex-auto justify-between flex-row mt-4">
            <div className="hidden sm:flex flex-row space-x-6 ">
              <div className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  flex -space-x-3 flex-row"></div>
            </div>
          </div>
          {/* Mobile and Small devices Navigation */}
          <div
            id="MobileNavigation"
            className={`${
              show ? "block" : "hidden"
            } transform duration-150 sm:hidden mt-4`}
          >
            <hr className=" w-full bg-gray-300" />
            <div className="flex flex-col gap-4 mt-4 max-w-sm mx-auto ">
            <div className=" flex justify-center items-center -space-x-3 flex-row">
                <p>Dashboard</p>
              </div> <div className=" flex justify-center items-center -space-x-3 flex-row">
                <p>Event</p>
              </div>
              <div className=" flex justify-center items-center -space-x-3 flex-row">
                <p>Statitics</p>
              </div>

              <hr className=" w-full bg-gray-300" />
              <button className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-gray-800 bg-white focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Preview</p>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.583496 6.99998C0.583496 6.99998 2.91683 2.33331 7.00016 2.33331C11.0835 2.33331 13.4168 6.99998 13.4168 6.99998C13.4168 6.99998 11.0835 11.6666 7.00016 11.6666C2.91683 11.6666 0.583496 6.99998 0.583496 6.99998Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-gray-800 bg-white focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center">
                <p>Publish</p>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.91683 4.66667L7.00016 1.75L4.0835 4.66667"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 1.75V8.75"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Save button */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
