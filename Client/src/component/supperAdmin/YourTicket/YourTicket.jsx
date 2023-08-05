import axios from "axios";
import React, { useEffect, useState } from "react";

function YourTicket(props) {
  const [selledTicketData, setSelledTicketData] = useState(null);
  const [upComingEvent, setUpcomingEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [todayEvent, setTodayEvents] = useState([]);
  const [tooltipStatus, setTooltipStatus] = useState(0);
  const[highlightTicket,setHighlightTicket] = useState(null)
  const [state, setState] = useState(true);
  const { userId } = props;
  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const { data } = await axiosInstance.get(
          `/GetSelledTicketData?id=${userId}`
        );
        if (data) {
          console.log("data--->", data);
          setSelledTicketData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(userId);
  }, [userId]);
  useEffect(() => {
    if (selledTicketData) {
      const data = selledTicketData.response;
      const today = new Date().toISOString().split("T")[0]+1
      console.log("today ---->", selledTicketData );

      const upcomingEvents = data.filter((item) => item.endDate > today);
      console.log("Upcoming Events ---->", upcomingEvents);
      setUpcomingEvents(upcomingEvents);

      const oldEvents = data.filter((item) => item.endDate < today);
      console.log("Old Events ---->", oldEvents);
      setOldEvents(oldEvents);

      const todayEvents = data.filter((item) => item.endDate === today);
      console.log("Today's Events ---->", todayEvents);
      setTodayEvents(todayEvents);
    }
  }, [selledTicketData]);

  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  const getTheIndex = (index,name) => {
    console.log(index)
    console.log(name)
    if(name === "upComingEvent"){
        const eventData = upComingEvent[index] 
        setHighlightTicket(eventData)
    }
    if(name === "oldEvents"){
        const eventData = oldEvents[index] 
        setHighlightTicket(eventData)
    }
    if(name === "todayEvent"){
        const eventData = todayEvent[index] 
        setHighlightTicket(eventData)
    }
    setTooltipStatus(1);
  };
  return (
    <>
      {todayEvent.length != 0 && (
        <div className="w-full max-w-2xl px-4">
          <br />
          <br />
          <div className="border rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Events Today
              </p>
            </div>
            <div className="px-6 pt-6 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {todayEvent.map((item,index)=>(
                    <tr>
                    <td>
                      <div className="flex items-center">
                        <img
                          src="data:image/png;base64,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"
                          width="50"
                          height="50"
                          alt="Image Description"
                        />

                        <div className="pl-3">
                          <div className="flex items-center text-sm leading-none">
                            <p className="font-semibold text-gray-800">
                              {item.eventTitle}
                            </p>
                            <p className="text-blue-500 ml-3">
                              <div
                                className="relative mt-20 md:mt-0"
                                onMouseEnter={() =>  getTheIndex(index, "todayEvent")}
                                onMouseLeave={() => setTooltipStatus(0)}
                              >
                                <div className="mr-2 cursor-pointer">
                                  <svg
                                    aria-haspopup="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-info-circle"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#A0AEC0"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={9} />
                                    <line x1={12} y1={8} x2="12.01" y2={8} />
                                    <polyline points="11 12 12 12 12 16 13 16" />
                                  </svg>
                                </div>
                              </div>
                            </p>
                          </div>
                          <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">
                          {item.endDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-16">
                      <div>
                        <p className="text-sm font-semibold leading-none text-right text-gray-800">
                        {item.TotalPrice}
                        </p>
                        <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                          <p className="text-xs leading-3 text-green-700">
                           {item.Quantity + " " + "People"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {upComingEvent.length != 0 && (
        <div className="w-full max-w-2xl px-4">
          <br />
          <br />
          <div className="border rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Upcoming Events
              </p>
            </div>
            <div className="px-6 pt-6 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {upComingEvent.map((item, index) => (
                    <>
                    <tr>
                      <td key={index}>
                        <div className="flex items-center">
                          <img
                            src="data:image/png;base64,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"
                            width="50"
                            height="50"
                            alt="Image Description"
                          />

                          <div className="pl-3">
                            <div className="flex items-center text-sm leading-none">
                              <p className="font-semibold text-gray-800">
                                {item.eventTitle} {index}
                              </p>
                              <p className="text-blue-500 ml-3">
                                <div
                                  className="relative mt-20 md:mt-0"
                                  onMouseEnter={() =>
                                    getTheIndex(index, "upComingEvent")
                                  }
                                  onMouseLeave={() => setTooltipStatus(0)}
                                >
                                  <div className="mr-2 cursor-pointer">
                                    <svg
                                      aria-haspopup="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-info-circle"
                                      width={20}
                                      height={20}
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="#A0AEC0"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <circle cx={12} cy={12} r={9} />
                                      <line x1={12} y1={8} x2="12.01" y2={8} />
                                      <polyline points="11 12 12 12 12 16 13 16" />
                                    </svg>
                                  </div>
                                </div>
                              </p>
                            </div>
                            <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">
                             {item.endDate}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <div>
                          <p className="text-sm font-semibold leading-none text-right text-gray-800">
                            {item.TotalPrice}
                          </p>
                          <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                            <p className="text-xs leading-3 text-green-700">
                              {item.Quantity + " " + "People"}
                            </p>
                          </div>
                        </div>
                      </td>
                    
                    </tr>
                    <br />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {oldEvents.length != 0 && (
        <div className="w-full max-w-2xl px-4">
          <br />
          <br />
          <div className="border rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Old Evnents
              </p>
            </div>
            <div className="px-6 pt-6 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {oldEvents != null &&
                    oldEvents.map((item, index) => (
                      <>
                        <tr>
                          <td key={index}>
                            <div className="flex items-center">
                              <img
                                src={item.QrcodeImage}
                                width="50"
                                height="50"
                                alt="Image Description"
                              />

                              <div className="pl-3">
                                <div className="flex items-center text-sm leading-none">
                                  <p className="font-semibold text-gray-800">
                                    {item.eventTitle}
                                  </p>
                                  <p className="text-blue-500 ml-3">
                                    <div
                                      className="relative mt-20 md:mt-0"
                                      onMouseEnter={() =>  getTheIndex(index, "oldEvents")}
                                      onMouseLeave={() => setTooltipStatus(0)}
                                    >
                                      <div className="mr-2 cursor-pointer">
                                        <svg
                                          aria-haspopup="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="icon icon-tabler icon-tabler-info-circle"
                                          width={20}
                                          height={20}
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="#A0AEC0"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                          />
                                          <circle cx={12} cy={12} r={9} />
                                          <line
                                            x1={12}
                                            y1={8}
                                            x2="12.01"
                                            y2={8}
                                          />
                                          <polyline points="11 12 12 12 12 16 13 16" />
                                        </svg>
                                      </div>
                                    </div>
                                  </p>
                                </div>
                                <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">
                                  {item.endDate}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="pl-16">
                            <div>
                              <p className="text-sm font-semibold leading-none text-right text-gray-800">
                                {item.TotalPrice}
                              </p>
                              <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                <p className="text-xs leading-3 text-green-700">
                                  {item.Quantity + " " + "People"}
                                </p>
                              </div>
                            </div>
                            
                          </td>
                          
                        </tr>
                       <br />
                      </>
                    ))}
                    
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="flex-col md:flex-row flex items-start md:justify-center">
        {/* Code Block for white tooltip starts */}
        <div
          className="relative mt-20 md:mt-0"
          onMouseEnter={() => setTooltipStatus(1)}
          onMouseLeave={() => setTooltipStatus(0)}
        >
          {tooltipStatus == 1 ? (
            <>
              (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setTooltipStatus(0)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-between">
                      <h1 className="text-xl font-bold text-gray-800 dark:text-black ml-4">
                        {highlightTicket.eventTitle}
                      </h1>
                      <button
                        className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                        onClick={() => setTooltipStatus(0)}
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
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                      {/* <p className="text-[15px] text-gray-600">
                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p> */}
                      <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div
                          className="w-1/3 bg-fill bg-contain bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${highlightTicket.QrcodeImage})`,
                          }}
                        />

                        <div className="w-2/3 p-4 md:p-4">
                          <div>
                            <div className="flex cursor-pointer items-center justify-between">
                              <p className="text-gray-700">
                                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  End Date
                                </span>
                                <br />
                               {highlightTicket.endDate}
                              </p>
                              <p className="text-gray-700">
                                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  Seat
                                </span>
                                <br />
                               {highlightTicket.Quantity}
                              </p>
                            </div>
                          </div>
                          <br />
                          <hr className="border border-solid border-black dark:border-black border-opacity-300 font-bold" />

                          <div className="flex justify-between mt-3 item-center">
                            <span>
                              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Location
                              </span>
                              <br />
                              infopark groun kochi ernakulam
                            </span>
                            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-400 md:text-xl">
                              Rs.{highlightTicket.TotalPrice}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : ( "" )
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default YourTicket;
