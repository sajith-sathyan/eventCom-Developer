import axios from "axios";
import React, { useState } from "react";
import ApproveViewEvent from "../ApproveViewEvent/ApproveViewEvent";
import EditEvents from "../../../component/User/EditEvent/EditEvent";
function ApproveEventList(props) {
  const { eventData ,user } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const [showEvent,setShowEvnet] = useState(false)
  const [eventId,setEvnetId]= useState(null)
  const [showEdit,setShowEdit] = useState(false)
  const [allEventData, setAllEventData] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  const handleCheckboxChange = (eventId) => {
    // GetAllEventDetialsByBasicInfoID
    console.log("first---->", eventId);

    const changeApproveStatus = async (eventId) => {
      const responce = await axiosInstance.get(
        `/admin/GetAllEventDetialsByBasicInfoID?id=${eventId}`
      );
      const AllDetialsEvent = responce.data;
      setAllEventData(AllDetialsEvent)
      console.log("AllDetialsEvent", AllDetialsEvent.BasicInfoData._id);
      if (AllDetialsEvent.BasicInfoData.EventStatus === "Pending") {
        const responce = await axiosInstance.get(
          `/admin/ApproveEvent?id=${eventId}`
        );
      } else {
        const responce = axiosInstance.get(
          `/admin/changeToPending?id=${eventId}`
        );
      }
    };
    changeApproveStatus(eventId);
  };
  console.log("eventData----->", eventData);

  const viewEvent =(id) =>{
    setShowEvnet(!showEvent)
   console.log("id--------------------->",id)
   setEvnetId(id)
  }
  console.log("eventData------->")
  const handleEdit = ()=>{
    setShowEdit(!showEdit)
  }
  return (
    <div>
      
      <section>
      {showEvent&&(<ApproveViewEvent  eventId = {eventId} user={user} />)}
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Event Management
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {eventData.map((event, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <img
                      src={event.eventImgUrl}
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                       {event.eventTitle}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Start Date:</dt>
                          <dd className="inline">{event.startDate}</dd>
                        </div>

                        <div>
                          <dt className="inline">End Date:</dt>
                          <dd className="inline">{event.endDate}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <span
                        className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm"
                        style={{ transform: "scale(0.8)" }}
                      >
                        <button onClick={()=>viewEvent(event._id)} className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        View
                        </button>

                        <a  href={`/organizations/${event._id}/editEvent`} 
                        onClick={handleEdit}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                          Edit
                        </a>
                      </span>

                      {event.EventStatus === "Approved" ? (
                        <label
                          htmlFor={event._id}
                          className="relative h-6 w-11 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={event._id}
                            className="peer sr-only"
                            onChange={() => handleCheckboxChange(event._id)}
                          />

                          <span className="absolute inset-0 rounded-full bg-green-500 transition peer-checked:bg-gray-300"></span>

                          <span className="absolute inset-y-0 end-0 m-0.5 h-5 w-5 rounded-full bg-white transition-all peer-checked:end-5"></span>
                        </label>
                      ) : (
                        <label
                          htmlFor={event._id}
                          className="relative h-6 w-11 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={event._id}
                            className="peer sr-only"
                            onChange={() => handleCheckboxChange(event._id)}
                          />

                          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

                          <span className="absolute inset-y-0 start-0 m-0.5 h-5 w-5 rounded-full bg-white transition-all peer-checked:start-5"></span>
                        </label>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {showEdit &&(<EditEvents  allEventData={allEventData}/>)}
    </div>
  );
}

export default ApproveEventList;
