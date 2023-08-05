import axios from "axios";
import React, { useEffect, useState } from "react";

export default (props) => {
  const { eventId } = props;
  const [allData, setAllData] = useState(null);
  const [user,setuser] = useState(null)
  const [state, setState] = useState(true);

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  useEffect(() => {
    try {
      const fetchEventdetials = async (eventId) => {
        try {
          // get all data use event media id
          const EventData = await axiosInstance.get(
            `/GetAllEventDetialsByBasicInfoID?id=${eventId}`
          );
          console.log("EventData-00-->", EventData.data);
          setAllData(EventData.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchEventdetials(eventId);
    } catch (err) {
      console.log(err);
    }
  }, []);
  if (allData != null) {
    var { BasicInfoData, EvetnMeidaData, TicketData } = allData;
  }

  return state ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setState(false)}
      ></div>
      <div className="container px-6 py-10 mx-auto">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-medium text-gray-800">
              Terms and agreements
            </h4>
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setState(false)}
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

          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className="lg:flex lg:-mx-6">
                <div className="lg:w-4/4 lg:px-6">
                  {allData != null && (
                    <img
                      className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
                      src={BasicInfoData[0].eventImgUrl}
                      alt=""
                    />
                  )}
                  <div>
                    {/* <p className="mt-6 text-sm text-blue-500 uppercase">
                  Want to know
                </p> */}
                    <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                      {allData != null && (
                        <h1 className="font-semibold text-gray-800 text-3xl md:text-4xl">
                          {BasicInfoData[0].eventTitle}
                        </h1>
                      )}
                    </h1>

                    <div className="flex items-center mt-6">
                      <img
                        className="object-cover object-center w-10 h-10 rounded-full"
                        // src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                        alt=""
                      />

                      <div className="mx-4 b">
                        <h1 className="text-sm text-gray-700 dark:text-gray-200">
                          {}
                        </h1>

                        {user!=null &&(
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user[0].username}
                        </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="flex flex-col lg:items-center justify-center w-full  py-1"></div>
                  <br />
                  <div>summary</div>
                  <br />
                  {allData != null && (
                    <h6 className="font-semibold text-gray-800 text-xl md:text-xl">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: EvetnMeidaData[0].description,
                        }}
                      ></div>
                    </h6>
                  )}
                  {/* <div dangerouslySetInnerHTML={{ __html: description }}></div>{" "} */}
                  */
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
