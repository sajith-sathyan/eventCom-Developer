import React, { useEffect, useState } from "react";
import LoctionSearch from "../LocationSearch/Location";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { legacy_createStore } from "redux";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEventId } from "../../../features/CreateEvent";
import EditBasicInfo from "../EditBasicInfo/EditBasicInfo";
import axiosInstance from "../../../Helper/axiosInstance"
function BasicInfo(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // this is the original one my google map id will expaire that why comment it
  // const [coordinates, setCoordinates] = useState({
  //   latitude: null,
  //   longitude: null,
  // });
    const [coordinates, setCoordinates] = useState({
    latitude: "123456",
    longitude: "12234455",
  });
  const [eventTitle, setTitle] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const [venueStatus, setVenue] = useState(false);
  const [onlineEstatus, setOnlineEstatus] = useState(false);
  const [locationAddress,setLocationAddress]=useState('')
  //data and time
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [shwoEditBasicInfo, setShowBasicInfo] = useState(false);
  const [shwoEditBasicInfoData, setShowBasicInfoData] = useState(false);
  // set error messge for event tittle
  const [tittleErrorMessage, setTittleErrorMessage] = useState("");
  // validate end date
  const [endtDateValidate, setEndDateValidate] = useState(false);
  // validate start date
  const [startDateValidate, setStartDateValidate] = useState(false);
  // validat time when event happen in today
  const [validateTime, setValidateTime] = useState(false);

  // check the evnet id present in  redux
  const eventIDs = useSelector((state) => state.eventIDs.value);

  //  check any filed is skiped when submitting

  useEffect(() => {
    if (eventIDs.BasicInfoId.length > 2) {
      const getBasicInfo = async (BasicInfoId) => {
        const { data } = await axiosInstance.get(
          `/GetBasicInfoByID?id=${BasicInfoId}`
        );
        setShowBasicInfoData(data);
        setShowBasicInfo(true);
      };
      getBasicInfo(eventIDs.BasicInfoId);
    }
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 48) {
      setTitle(value);
      setTittleErrorMessage("");
    } else {
      setTitle(value.substring(0, 48));
      setTittleErrorMessage("Maximum 48 characters allowed");
    }
  };

  // check all the fileds are filled
  const [formData, setFormData] = useState({
    eventTitle: "",
    organizerName: "",
    type: "",
    category: "",
    venueStatus: "",
    onlineEstatus: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const starDateValidate = (e) => {
    try {
      if (!e || typeof e.target !== "object" || !("value" in e.target)) {
        throw new Error(
          'Invalid input. Expected an event object with a "target" property.'
        );
      }

      const value = e.target.value;

      const Today = formattedDate();

      if (Today < value) {
        console.log("comming day");
        setStartDate(value);
        setStartDateValidate(false);
      } else if (Today > value) {
        setStartDateValidate(true);
        console.log("Yester day");
      } else if (Today === value) {
        console.log("sa,e");
        setStartDateValidate(false);
        setStartDate(value);
      }
    } catch (error) {
      console.error("Error in starDateValidate:", error);
    }
  };

  const endDateValidate = (e) => {
    const value = e.target.value;
    const Today = formattedDate();
    if (Today < value) {
      setEndDate(value);
      setEndDateValidate(false);
    } else if (Today > value) {
      setEndDate(value);
      setEndDateValidate(true);
    } else if (Today === value) {
      setEndDateValidate(false);
      setEndDate(value);
    }
  };

  // format the today date like this format( 2023-05-29)
  const formattedDate = () => {
    const TodayDate = new Date();
    const formattedDate = new Date(TodayDate);
    formattedDate.setDate(formattedDate.getDate());
    const Today = formattedDate.toISOString().split("T")[0];
    return Today;
  };

  const handleEndTime = (e) => {
    const value = e.target.value
    const Today = formattedDate();
    if (endDate === Today) {
      if (startTime > value) {
        console.log("here problem")
        console.log("startTime---->",startTime)
        console.log("endTime---->",endTime)
        setValidateTime(true);
      } else {
        console.log("no problem");
        setValidateTime(false);
        setEndTime(value);
      }
    }else{
      setEndTime(value); 
      console.log("else work")
    }
   
  };

  // get the user id from local storage
  const userId = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
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
 // const get location address
 const LocationAddress = (address)=>{
  console.log("LocationAddress---->",address)
  setLocationAddress(address)
}
  // get cordinates form child componet
  function handleCoordinates(latitude, longitude) {
    setCoordinates({
      latitude: latitude,
      longitude: longitude,
    });
  }

  console.log("decryptedUserId-->", decryptedUserId);

  // form submition send data to server

  const handilesubmitt = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosInstance
        .post(
          "/manage/create",
          {
            EventStatus: "Pending",
            decryptedUserId,
            eventTitle,
            organizerName,
            type,
            category,
            locationAddress:"kochi",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            startDate,
            startTime,
            endDate,
            endTime,
          },
          { withCredentials: true }
        )
        .catch((err) => {
          const errorMessage = err.response.data.msg.message;

          // Iterate over the entries and log the key and value
          const regex = /(\w+):\s(\w+\s?\w+)/g;
          let match;
          const keyValuePairs = {};

          while ((match = regex.exec(errorMessage)) !== null) {
            const key = match[1];
            const value = match[2];
            keyValuePairs[key] = value;
            const error = key + " are not filled";
            toast.error(error, {
              position: "bottom-right",
            });
          }
          console.log("", err.response.data.msg.message);
        });

      if (data.error) {
        console.log(data.error, "responce error");
      } else {
        console.log(data);
        const basicInfoId = data.saveBasicInfo._id;
        navigate(`/event/details/${basicInfoId}`);
      }
    } catch (err) {
      console.log(err, "handilesubmitt error");
    }
  };

  // for show and hide location search input filed
  const handleLocation = () => {
    if (venueStatus) {
      setVenue(false);
    } else {
      setVenue(true);
    }
  };
  const handleOnlineEvent = () => {
    if (onlineEstatus) {
      setOnlineEstatus(false);
    } else {
      setOnlineEstatus(true);
    }
  };

 
  

  return (
    <>
      {shwoEditBasicInfo ? (
        <EditBasicInfo basicInfoData={shwoEditBasicInfoData} />
      ) : (
        <>
          <div className="my-20 flex flex-col items-center justify-center ">
            <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-0 py-8 rounded-md w-full max-w-lg">
              <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                Basic Info
              </div>
              <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                <br /> Name your event and tell event-goers why they should
                come. Add details that highlight what makes it unique.
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
                    <input
                      id="EventTitle"
                      type="text"
                      name="EventTitle"
                      value={eventTitle}
                      onChange={handleInputChange}
                      maxLength={49}
                      className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Be clear and descriptive"
                    />
                    {tittleErrorMessage && (
                      <p className="text-red-500 text-sm mt-2">
                        {tittleErrorMessage}
                      </p>
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
                    <input
                      id="OrganizerName"
                      type="text"
                      name="OrganizerName"
                      className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Tell the attendees who is Organizing this event"
                      onChange={(e) => setOrganizerName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div>
                    <select
                      name="Type"
                      id="Type"
                      className="my-2 mr-2 border rounded py-2 px-0 border border-gray-400  py-1 focus:outline-none focus:border-blue-400 "
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Type">Type</option>
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
                    >
                      <option value="volvo">Category</option>
                      <option value="Auto, Boat,Air">
                        Auto, Boat,&amp; Air
                      </option>
                      <option value="Business,Professional">
                        Business &amp; Professional
                      </option>
                      <option value="Charity,Causes">
                        Charity &amp; Causes
                      </option>
                      <option value="Community,Culture">
                        Community &amp; Culture
                      </option>
                      <option value="Family,Education">
                        Family &amp; Education
                      </option>
                      <option value="Fashion,Beauty">
                        Fashion &amp; Beauty
                      </option>
                      <option value="Film, Media,Entertainment">
                        Film, Media &amp; Entertainment
                      </option>
                      <option value="Food,Drink">Food &amp; Drink</option>
                      <option value="Government,Politics">
                        Government &amp; Politics
                      </option>
                      <option value="Health,Wellness">
                        Health &amp; Wellness
                      </option>
                      <option value="Hobbies,Special Interest">
                        Hobbies &amp; Special Interest
                      </option>
                      <option value="Home,Lifestyle">
                        Home &amp; Lifestyle
                      </option>
                      <option value="Performing,Visual Arts">
                        Performing &amp; Visual Arts
                      </option>
                      <option value="Religion,Spirituality">
                        Religion &amp; Spirituality
                      </option>
                      <option value="School Activities">
                        School Activities
                      </option>
                      <option value="Science,Technology">
                        Science &amp; Technology
                      </option>
                      <option value="Seasonal,Holiday">
                        Seasonal &amp; Holiday
                      </option>
                      <option value="Sports,Fitness">
                        Sports &amp; Fitness
                      </option>
                      <option value="Travel,Outdoor">
                        Travel &amp; Outdoor
                      </option>
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
                      onClick={handleLocation}
                      className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                    >
                      Venue
                    </div>
                  )}
                  {!venueStatus && (
                    <div
                      onClick={handleOnlineEvent}
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
                      <LoctionSearch onSendCoordinates={handleCoordinates} LocationAddress={LocationAddress} />
                    </div>
                  </div>
                )}

                {/* date and time */}

                <hr className="border-t border-gray-600 my-8" />
                <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                  Date and time
                </div>
                <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  <br /> Tell event-goers when your event starts and ends so
                  they can make plans to attend.
                </span>
                <div className="flex flex-row ">
                  <div className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                    Single Event
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
                    <input
                      type="date"
                      name=""
                      id=""
                      className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      // onChange={(e) => setStartDate(e.target.value)}
                      onChange={starDateValidate}
                    />
                    {startDateValidate && (
                      <p className="text-red-500 text-sm mt-2">
                        the date must start today or coming days
                      </p>
                    )}
                  </div>
                  <div>
                    {" "}
                    <label
                      htmlFor="email"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                    >
                      Start Time*
                    </label>
                    <input
                      type="time"
                      name=""
                      id=""
                      className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      onChange={(e) => setStartTime(e.target.value)}
                    />
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
                    <input
                      type="date"
                      name=""
                      id=""
                      className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      onChange={endDateValidate}
                    />
                    {endtDateValidate && (
                      <p className="text-red-500 text-sm mt-2">
                        the date must end today or coming days
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-black-600"
                    >
                      {" "}
                      End Time*{" "}
                    </label>
                    <input
                      type="time"
                      name=""
                      id=""
                      className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      onChange={handleEndTime}
                    />
                    {validateTime && (
                      <p className="text-red-500 text-sm mt-2">
                        choose date after start date
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <dir className="flex flex-col mb-6">
                  <button
                    type="button"
                    onClick={(e) => handilesubmitt(e)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-items-end"
                  >
                    Submitt
                  </button>
                </dir>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default BasicInfo;
