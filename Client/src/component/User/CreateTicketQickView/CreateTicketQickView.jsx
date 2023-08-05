import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Helper/axiosInstance";

export default function CreateTicketQickView(props) {
  const { basicInfoId, getAdmissionData, getTicketData, BasicInfo } = props;

  const Navigate = useNavigate();
  console.log("props-->", basicInfoId);
  const [state, setState] = useState(true);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState("General Admission");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");

  // date validation error

  const [startDateError, setStartDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);

  const [error, setError] = useState("");
  console.log("BasicInfo----->", BasicInfo);
  // send the data to the data base
  const AdmissionhandleSubmit = async (e) => {
    e.preventDefault();
    const Addmission = {
      ticketStatus,
      name,
      quantity,
      price,
      startDate,
      startTime,
      endDate,
      endTime,
    };
    const errors = validateFields(
      state,
      name,
      quantity,
      ticketStatus,
      startDate,
      startTime,
      endDate,
      endTime
    );
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    try {
      const responce = await axiosInstance.post(
        "/addTickets",
        {
          basicInfoId,
          Addmission: Addmission,
        },
        { withCredentials: true }
      );
      console.log("responce--[][[][][][][]]->", responce);
      if (responce.data.Addmission) {
        setState(false);
        getAdmissionData(true);
        getTicketData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFree = () => {
    setTicketStatus("free");
    if (free) {
      setFree(false);
      setPaid(true);
    } else {
      setFree(true);
      setPaid(false);
    }
  };
  const handlePaid = () => {
    setTicketStatus("paid");

    if (paid) {
      setPaid(false);
      setFree(true);
    } else {
      setPaid(true);
      setFree(false);
    }
  };

  const validateFields = (
    state,
    name,
    quantity,
    ticketStatus,
    startDate,
    startTime,
    endDate,
    endTime
  ) => {
    let errors = {};
    if (state.length < 1) {
      errors.state = "Please fill the state field.";
    }
    if (name.length < 1) {
      errors.name = "Please fill the name field.";
    }
    if (quantity.length < 1) {
      errors.quantity = "Please fill the quantity field.";
    }
    if (ticketStatus.length < 1) {
      errors.ticketStatus = "Please fill the price field.";
    }
    if (startDate.length < 1) {
      errors.startDate = "Please fill the Start Date field.";
    }
    if (startTime.length < 1) {
      errors.startTime = "Please fill the Start Time field.";
    }
    if (endDate.length < 1) {
      errors.endDate = "Please fill the End Date field.";
    }
    if (endTime.length < 1) {
      errors.endTime = "Please fill the End Time field.";
    }

    return errors;
  };

  // make start date validate

  const handleStartDate = (e) => {
    const value = e.target.value;
    console.log("startDate---->", BasicInfo[0].startDate);
    console.log("value---->", value);
    if (BasicInfo[0].endDate < value) {
      console.log("Start date cannot be before the event's start date");
      setStartDateError(true);
    } else {
      console.log("Start date is valid");
      setStartDate(value);
      setStartDateError(false);
    }
  };

  const handleStartTime = (e) => {
    const value = e.target.value;

    setStartTime(value);
  };

  const handleEndDate = (e) => {
    const value = e.target.value;
    if (BasicInfo[0].endDate < value) {
      setEndDateError(true);
    } else {
      setEndDate(value);
      setEndDateError(false);
    }
  };

  const handleEndTime = (e) => {
    const value = e.target.value;
    console.log("value--->", value);
    console.log("BasicInfo.endTime--->", BasicInfo[0].endTime);
    setEndTime(value);
  };

  return state ? (
    <div className="fixed absolute inset-0 z-50 overflow-y-auto h-500 w-500">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setState(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-medium text-gray-800">Add tickets</h4>
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
          <div className="flex items-center gap-3 p-4  border-t">
            {free ? (
              <button
                onClick={handleFree}
                className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Free
              </button>
            ) : (
              <button
                onClick={handleFree}
                className="px-6 py-2 text-[12.5px]   text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Free
              </button>
            )}

            {paid ? (
              <>
                <button
                  onClick={handlePaid}
                  className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Paid
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handlePaid}
                  className="px-6 py-2 text-[12.5px]   text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Paid
                </button>
              </>
            )}
          </div>

          <div className="space-y-2 p-4  text-[12.5px] leading-relaxed text-gray-500">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={name}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <div>
              <label className="font-medium">Available Quanity</label>
              <input
                type="Number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {error.quantity && (
              <p className="text-red-500 text-sm">{error.quantity}</p>
            )}
            {paid && (
              <>
                <div>
                  <label className="font-medium">Price</label>
                  <input
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Validate the input value to allow only numeric values
                      const numericValue = parseFloat(inputValue);
                      if (!isNaN(numericValue)) {
                        setPrice(numericValue);
                      }
                    }}
                    type="text"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                {error.ticketStatus && (
                  <p className="text-red-500 text-sm">{error.ticketStatus}</p>
                )}
              </>
            )}
            {error.paid && <p className="text-red-500 text-sm">{error.paid}</p>}

            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]sm:text-sm tracking-wide text-black-600"
                >
                  {" "}
                  Sales Start Date*{" "}
                </label>
                <input
                  onChange={handleStartDate}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
                {startDateError && (
                  <p className="text-red-500 text-sm mt-2">
                    event end in this date
                  </p>
                )}

                {startDateError && (
                  <p className="text-red-500 text-sm">
                    Start date cannot be before the event's start date"
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                >
                  {" "}
                  Sales Start Time*{" "}
                </label>
                <input
                  onChange={handleStartTime}
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
                {error.startTime && (
                  <p className="text-red-500 text-sm">{error.startTime}</p>
                )}
              </div>
            </div>

            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                >
                  {" "}
                  Sales End Date*{" "}
                </label>
                <input
                  onChange={handleEndDate}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
                {endDateError && (
                  <p className="text-red-500 text-sm mt-2">
                    event end in this date
                  </p>
                )}
                {error.endDate && (
                  <p className="text-red-500 text-sm">{error.endDate}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px] tracking-wide text-black-600"
                >
                  {" "}
                  Sales End Time*{" "}
                </label>
                <input
                  onChange={handleEndTime}
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
                {error.endTime && (
                  <p className="text-red-500 text-sm">{error.endTime}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex position: fixed; items-center gap-3 p-4 mt-5 border-t">
            <button
              className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              onClick={AdmissionhandleSubmit}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
