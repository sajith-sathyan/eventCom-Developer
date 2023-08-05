import React, { useEffect, useState } from "react";
import LoctionSearch from "../LocationSearch/Location";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Helper/axiosInstance"
function EditBasicInfo(props) {
  const {basicInfoData} = props
  const [eventTitle, setTitle] = useState(basicInfoData.eventTitle);
  const [organizerName, setOrganizerName] = useState(basicInfoData.organizerName);
  const [type, setType] = useState(basicInfoData.type);
  const [category, setCategory] = useState(basicInfoData.category);

  const [venueStatus, setVenue] = useState(false);
  const [onlineEstatus, setOnlineEstatus] = useState(false);
  //data and time
  const [startDate, setStartDate] = useState(basicInfoData.startDate);
  const [startTime, setStartTime] = useState(basicInfoData.startTime);
  const [endDate, setEndDate] = useState(basicInfoData.endDate);
  const [endTime, setEndTime] = useState(basicInfoData.endTime);

  // set error messge for event tittle
  const [errorMessage, setErrorMessage] = useState("");

const navigate = useNavigate()
  console.log("basicInfoData-->",basicInfoData)
  const BasicInfoUpdate = async(e) => {
    console.log("called------>")
    const responce =await axiosInstance.post(
      `/updataBasicInfo?id=${basicInfoData._id}`,
      {
       
        eventTitle,
        organizerName,
        type,
        category,
        latitude: basicInfoData.latitude,
        longitude:basicInfoData.longitude,
        startDate,
        startTime,
        endDate,
        endTime,
      },
      { withCredentials: true }
    );
    console.log(responce);
    if(responce){
      navigate(`/event/details/${basicInfoData._id}`);
    }
  };
  return (
    <>
      <div className="my-20 flex flex-col items-center justify-center ">
        <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-0 py-8 rounded-md w-full max-w-lg">
          <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
            Basic Info
          </div>
          <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            <br /> Name your event and tell event-goers why they should come.
            Add details that highlight what makes it unique.
          </span>

          <div className="mt-10">
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-red-600"
              >
                Event title*
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>
               {basicInfoData && ( <input
                  id="EventTitle"
                  type="text"
                  name="EventTitle"
                  onChange={(e) => setTitle(e.target.value)}
                  value={eventTitle}
                  
                  maxLength={49}
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Be clear and descriptive"
                /> )}
               {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-red-600"
              >
                Organizer name*
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>
              {basicInfoData &&   <input
                  id="OrganizerName"
                  type="text"
                  name="OrganizerName"
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Tell the attendees who is Organizing this event"
                  onChange={(e) => setOrganizerName(e.target.value)}
                  value={organizerName}
                  required
                />}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div>
                <select
                  name="Type"
                  id="Type"
                  className="my-2 mr-2 border rounded py-2 px-0 border border-gray-400  py-1 focus:outline-none focus:border-blue-400 "
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  {basicInfoData&& (<option value="Type">{basicInfoData.type}</option>)}
                  <option value="Appearance or Signing">
                    Appearance or Signing
                  </option>
                  <option value="Class, Training, or Workshop">
                    Class, Training, or Workshop
                  </option>
                  <option value="Concert or Performance<">
                    Concert or Performance
                  </option>
                  <option value="Conference">Conference</option>
                  <option value="Convention">Convention</option>
                  <option value="Dinner or Gala">Dinner or Gala</option>
                  <option value="Festival or Fair">Festival or Fair</option>
                  <option value="Game or Competition">
                    Game or Competition
                  </option>
                  <option value="Meeting or Networking Event">
                    Meeting or Networking Event
                  </option>
                  <option value="Party or Social Gathering<">
                    Party or Social Gathering
                  </option>
                  <option value="Race or Endurance Event">
                    Race or Endurance Event
                  </option>
                  <option value="Rally">Rally</option>
                  <option value="Screening">Screening</option>
                  <option value="Seminar or Talk">Seminar or Talk</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Tradeshow, Consumer Show, or Expo">
                    Tradeshow, Consumer Show, or Expo
                  </option>
                  <option value="other">other</option>
                </select>
              </div>
              <div>
                <select
                  name="Category"
                  id="Category"
                  className="my-2 mr-2  border rounded py-2 px-0   border border-gray-400  py-2 focus:outline-none focus:border-blue-400"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {basicInfoData&& (<option value="Type">{basicInfoData.category}</option>)}
                  <option value="Auto, Boat,Air">Auto, Boat,&amp; Air</option>
                  <option value="Business,Professional">
                    Business &amp; Professional
                  </option>
                  <option value="Charity,Causes">Charity &amp; Causes</option>
                  <option value="Community,Culture">
                    Community &amp; Culture
                  </option>
                  <option value="Family,Education">
                    Family &amp; Education
                  </option>
                  <option value="Fashion,Beauty">Fashion &amp; Beauty</option>
                  <option value="Film, Media,Entertainment">
                    Film, Media &amp; Entertainment
                  </option>
                  <option value="Food,Drink">Food &amp; Drink</option>
                  <option value="Government,Politics">
                    Government &amp; Politics
                  </option>
                  <option value="Health,Wellness">Health &amp; Wellness</option>
                  <option value="Hobbies,Special Interest">
                    Hobbies &amp; Special Interest
                  </option>
                  <option value="Home,Lifestyle">Home &amp; Lifestyle</option>
                  <option value="Performing,Visual Arts">
                    Performing &amp; Visual Arts
                  </option>
                  <option value="Religion,Spirituality">
                    Religion &amp; Spirituality
                  </option>
                  <option value="School Activities">School Activities</option>
                  <option value="Science,Technology">
                    Science &amp; Technology
                  </option>
                  <option value="Seasonal,Holiday">
                    Seasonal &amp; Holiday
                  </option>
                  <option value="Sports,Fitness">Sports &amp; Fitness</option>
                  <option value="Travel,Outdoor">Travel &amp; Outdoor</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
            <div className="flex w-full"></div>

            {/* location */}

            <hr className="border-t border-gray-600 my-8" />
            <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
              Location
            </div>
            <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              <br /> Help people in the area discover your event and let
              attendees know where to show up.
            </span>
            <br />
            <div className="flex flex-row ">
              {!onlineEstatus && (
                <div
                  
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                >
                  Venue
                </div>
              )}
              {!venueStatus && (
                <div
                 
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                >
                  Online event
                </div>
              )}
            </div>
            <br />
            {venueStatus && (
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>
                  {/* <LoctionSearch onSendCoordinates={handleCoordinates} /> */}
                </div>
              </div>
            )}

            {/* date and time */}

            <hr className="border-t border-gray-600 my-8" />
            <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
              Date and time
            </div>
            <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              <br /> Tell event-goers when your event starts and ends so they
              can make plans to attend.
            </span>
            <div className="flex flex-row ">
              <div className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                Single Event
              </div>
              <div className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                Recurring Event
              </div>
            </div>
            <br />
            <div className="flex flex-row "></div>
            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                >
                  Start Date*
                </label>
             {basicInfoData &&    <input
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                />}
              
              </div>
              <div>
                {" "}
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                >
                  Start Time*
                </label>
               {basicInfoData &&  <input
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                />}
              </div>
            </div>
            <br />
            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                >
                  {" "}
                  End Date*{" "}
                </label>
               {basicInfoData && <input
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                />}
              
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                >
                  {" "}
                  End Time*{" "}
                </label>
               {basicInfoData &&  <input
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                  onChange={(e) => setEndTime(e.target.value)} 
                 value={endTime}
                />}
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <dir className="flex flex-col mb-6">
              <button
                type="button"
                onClick={BasicInfoUpdate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-items-end"
              >
                Submitt
              </button>
            </dir>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBasicInfo;
