import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Helper/axiosInstance"
export default (props) => {
  const { basicInfoId } = props;
  console.log("basicInfoId--qickview-> ", basicInfoId);
  const [state, setState] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [error, setError] = useState("");
  console.log("paid---->", paid);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields(
      name,
      ticketStatus,
      price,
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
          ticketStatus,
          name,
          quantity,
          price,
          startDate,
          startTime,
          endDate,
          endTime,
        },
        { withCredentials: true }
      );
      console.log("responce----->", responce);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFree = () => {
    setTicketStatus("free");
    if (free) {
      setFree(false);
    } else {
      setFree(true);
    }
  };
  const handlePaid = () => {
    setTicketStatus("paid");

    if (paid) {
      setPaid(false);
    } else {
      setPaid(true);
    }
  };

  // summary validation
  const validateFields = (
    name,
    ticketStatus,
    quantity,
    price,
    startDate,
    startTime,
    endDate,
    endTime
  ) => {
    let errors = {};
    console.log("paid--->", paid);
    if (ticketStatus === "paid") {
      if (price.length < 2) {
        errors.price = "Please fill the price field.";
      }
    }
    if (name.length < 2) {
      errors.name = "Please fill the name field.";
    }
    if (quantity.length < 2) {
      errors.quantity = "Please fill the quantity field.";
    }

    if (startDate.length < 2) {
      errors.startDate = "Please fill the startDate field.";
    }
    if (startTime.length < 2) {
      errors.startTime = "Please fill the startTime field.";
    }
    if (endDate.length < 2) {
      errors.endDate = "Please fill the endDate field.";
    }
    if (endTime.length < 2) {
      errors.endTime = "Please fill the endTime field.";
    }
    return errors;
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
              <button
                onClick={handlePaid}
                className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Paid
              </button>
            ) : (
              <button
                onClick={handlePaid}
                className="px-6 py-2 text-[12.5px]   text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Paid
              </button>
            )}
          </div>
          <div className="space-y-2 p-4  text-[12.5px] leading-relaxed text-gray-500">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              {error.name && (
                <p className="text-red-500 text-sm">{error.name}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Available Quanity</label>
              <input
                type="Number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />
              {error.quantity && (
                <p className="text-red-500 text-sm">{error.quantity}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="Number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {error.price && (
                <p className="text-red-500 text-sm">{error.price}</p>
              )}
            </div>
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
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
                {error.startDate && (
                  <p className="text-red-500 text-sm">{error.startDate}</p>
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
                  onChange={(e) => setStartTime(e.target.value)}
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
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
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
                  onChange={(e) => setEndTime(e.target.value)}
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
              onClick={handleSubmit}
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
};
