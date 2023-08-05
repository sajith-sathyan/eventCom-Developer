import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Qickview from "../Qickview/Qickview";
import axios from "axios";
import axiosInstance from "../../../Helper/axiosInstance"
function Tickets(props) {
  const { basicInfoId ,EventMediaId} = props;
  console.log("basicInfoId-----props------->",basicInfoId)
  const [createTicket, setCreateTicket] = useState(false);
  const handleCreateTicket = () => {
    if (createTicket) {
      setCreateTicket(false);
    } else {
      setCreateTicket(true);
    }
  };

 
  return (
    <>
      <div class="flex justify-center items-center pt-20">
        {createTicket && <Qickview basicInfoId={basicInfoId} />}
        <button
          onClick={handleCreateTicket}
          class="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
        >
          Create Ticket
        </button>
      </div>

      <div className="p-4 sm:ml-64">
        <main className="flex items-center justify-center flex-1 px-4 py-8">
          {/* <h1 className="text-5xl font-bold text-gray-500">In progress</h1> */}
          {/* Content */}
          {/* component */}

          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                Tickets
              </h1>
              <p className="text-base font-medium leading-6 text-gray-600">
                {/* 21st Mart 2021 at 10:34 PM */}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  {/* <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p> */}

                  <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-base xs:text-xl font-bold leading-6 text-gray-800">
                          <a href="{`event/${list.EventMediaId}/eventMedia`} ">
                            list.eventTitle
                          </a>
                          <h1>list.EventMediaId</h1>
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">status: </span> On
                            sales
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">End Date: </span>{" "}
                            12/22/2022
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">End Tiem: </span>{" "}
                            12/22/2022
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg text-center leading-6">
                          Sold Out
                          <span className="text-red-300 line-through">
                            {" "}
                            $45.00
                          </span>
                        </p>
                        <p className="text-base xl:text-lg leading-6">
                          price
                          <span className="text-red-300 line-through">
                            {" "}
                            $45.00
                          </span>
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M3.5,19H18.5V4h-3V2h-2v2h-8V2h-2v2h-3C2.7,4,2,4.7,2,5.5v11C2,18.3,2.7,19,3.5,19z M19.7,3.3c0.4-0.4,0.4-1,0-1.4l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0l-1,1L18.7,4L19.7,3.3z M6.3,16.7l-3.3,0.9v-3.6l8.6-8.6l3.3,3.3L6.3,16.7z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 96 960 960"
                          width="48"
                        >
                          <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" />
                        </svg>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Tickets;
