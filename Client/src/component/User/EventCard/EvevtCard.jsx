import React, { useState } from "react";
import axiosInstance from "../../../Helper/axiosInstance"
export default function EventCard(props) {
  const { eventData } = props;
  console.log("eventData--props-->", eventData);
  // set error messge for event tittle
  const [inputValue, setInputValue] = useState("");

  const handleTitleSubmitt = (e) => {
    const value = e.target.value;
    if (value.length <= 48) {
      setInputValue(value);
    }
  };
  const errorMessage = inputValue.length > 48 && (
    <p className="text-red-500 text-sm mt-2">Maximum 48 characters allowed</p>
  );
  // format the today date like this format( 2023-05-29)
  const formattedDate = () => {
    const TodayDate = new Date();
    const formattedDate = new Date(TodayDate);
    formattedDate.setDate(formattedDate.getDate());
    const Today = formattedDate.toISOString().split("T")[0];
    console.log(Today); // Output: 2023-05-29
    return Today;
  };
  const Today = formattedDate();
  return (
    <>
      <div className="bg-gray-100 ">
        {/* Remove py-8 */}
        <div className="mx-auto container py-8">
          <div className="flex flex-wrap items-center lg:justify-start  justify-center">
            {/* Card 1 */}
            {eventData.map(
              (event, index) =>
                event.endDate >= Today && ( 
                  <div className="mx-2 w-72 py-2 lg:mb-0 mb-8">
                    <div>
                      <img src={event.eventImgUrl} className="w-full h-44" />
                    </div>
                    <div className="bg-white">
                      <div className="flex items-center justify-between px-4 pt-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-heart"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5.5c-3.5-3-9.2 1-6.5 5.5c2.3 3.8 6.5 7.2 6.5 7.2s4.2-3.4 6.5-7.2c2.7-4.5-3-8.5-6.5-5.5z" />
                          </svg>
                        </div>
                        <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                          <p className="text-xs text-yellow-500">On Sale</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center">
                          <h2 className="text-lg font-semibold">
                            <a href={`/ViewEvent/${event._id}`}>
                              {event.eventTitle}
                            </a>
                          </h2>
                          <p></p>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {event.startDate}
                        </p>
                        <br />
                        <div>
                          <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                            {event.locationAddress}
                          </p>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <h2 className="text-indigo-700 text-xs font-semibold">
                            {event.organizerName}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}

            {/* Card 1 Ends */}
            {/* Card 2 */}

            {/* Card 4 Ends */}
          </div>
        </div>
      </div>
    </>
  );
}
