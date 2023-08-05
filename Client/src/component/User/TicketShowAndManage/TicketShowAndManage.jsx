import React, { useEffect, useState } from "react";
import CreateTicketQickView from "../CreateTicketQickView/CreateTicketQickView";
import AddOnsQuickView from "../AddOnsQuickView/AddOnsQuickView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Helper/axiosInstance"
function TicketShowAndManage(props) {
  const { basicInfoId, TicketData, BasicInfo } = props;
  const [createTicket, setCreateTicket] = useState(false);
  const [showAdmisson, setAdmission] = useState(true);
  const [Addons, setAddons] = useState([]);
  const [showAdons, setAdons] = useState(false);
  const [showPromoCode, setPromoCode] = useState(false);
  const [admission, setAdmisson] = useState([]);
  const [childData, setChildData] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const Naviagte = useNavigate();
  const handleCreateTicket = () => {
    if (createTicket) {
      setCreateTicket(false);
    } else {
      setCreateTicket(true);
    }
  };

  // this function is helo fetch data form the ticket databse
  const getTicketData = async () => {
    try {
      const response = await axiosInstance.get(
        `/getTicket?id=${basicInfoId}`
      );
      const ticketData = response.data;

      console.log("Ticket--||->", ticketData);
      setTicketId(ticketData[0]._id);
      if (ticketData[0].Addmission) {
       
        setAdmisson(ticketData[0].Addmission);
      }
      if (ticketData.AddOns) {
        setAddons(ticketData.AddOns);
      }

      // Add any additional logic or state updates based on the ticket data
    } catch (error) {
      console.error("Error retrieving ticket data:", error);
    }
  };

  useEffect(() => {
    getTicketData();
  }, [pathToAdmission, pathToAddons, pathToPromoCode, childData]);

  console.log("admission--->", admission);

  // get the addmisson data form the  CreateTicketQickView component after submission

  const getAdmissionData = (status) => {
    setChildData(status);
  };

  const pathToAdmission = () => {
    setAdmission(true);
    setAdons(false);
    setPromoCode(false);
    getTicketData();
  };

  const pathToAddons = () => {
    setAdmission(false);
    setAdons(true);
    setPromoCode(false);
    getTicketData();
  };

  const pathToPromoCode = () => {
    setAdmission(false);
    setAdons(false);
    setPromoCode(true);
    getTicketData();
  };

  const goToPublish = () => {
    Naviagte("/");
  };

  // delete a event
  const deleteEvent = async (index) => {
    console.log(index);
    const { data } = await axiosInstance.post(
      "/deleteAdmission",
      { "index": index, "ticketId": ticketId },
      { withCredentials: true }
    );

    if (data) {
      console.log("data-->", data);
    }
  };

  return (
    <div>
      {" "}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header class="flex items-center py-4 ">
              {" "}
              <ul class="flex">
                <li class="mr-6" onClick={pathToAdmission}>
                  {showAdmisson ? (
                    <p class="text-indigo-600">Admission</p>
                  ) : (
                    <p class="text-gray hover:text-indigo-600 cursor-pointer">
                      Admission
                    </p>
                  )}
                </li>
                {/* <li class="mr-6" onClick={pathToAddons}>
                  {showAdons ? (
                    <p class="text-indigo-600">Add-ons</p>
                  ) : (
                    <p class="text-gray hover:text-indigo-600 cursor-pointer">
                      Add-ons
                    </p>
                  )}
                </li> */}
                <li onClick={pathToPromoCode}>
                  {showPromoCode ? (
                    <p class="text-indigo-600">Promo-code</p>
                  ) : (
                    <p className="text-gray hover:text-indigo-600 cursor-pointer">
                      Promo-code
                    </p>
                  )}
                </li>
              </ul>
              <button
                onClick={goToPublish}
                class="mx-2 my-2 items-center  bg-indigo-400 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
              >
                Publish
              </button>
            </header>
            <hr />
            {showAdons || showPromoCode ? (
              ""
            ) : (
              <>
                <div class="flex justify-end items-center ">
                  {createTicket && (
                    <CreateTicketQickView
                      basicInfoId={basicInfoId}
                      getAdmissionData={getAdmissionData}
                      getTicketData={getTicketData}
                      BasicInfo={BasicInfo}
                    />
                  )}
                  <button
                    onClick={handleCreateTicket}
                    class="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
                  >
                    Create Ticket
                  </button>
                </div>

                {admission.map((Ticket, index) => (
                  <div className="mt-8" key={index}>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4">
                        <div>
                          <h3 className="text-sm text-gray-900 cursor-pointer">
                            {Ticket.name}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">End Date:</dt>
                              <dd className="inline">{Ticket.endDate} </dd>
                            </div>

                            <div>
                              <dt className="inline">Time:</dt>
                              <dd className="inline">{Ticket.endTime}</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <div>
                            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-400 dark:text-green-900">
                              On Sale
                            </span>
                          </div>
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={Ticket.quantity}
                              id="Line1Qty"
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                          <button
                            onClick={() => deleteEvent(index)}
                            className="text-gray-600 transition hover:text-red-600"
                          >
                            <span className="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                      <hr />
                    </ul>
                  </div>
                ))}
              </>
            )}

            {/* {showAdons && (
              <>
                <div class="flex justify-end items-center ">
                  {createTicket && (
                    <AddOnsQuickView
                      basicInfoId={basicInfoId}
                      getAdmissionData={getAdmissionData}
                      getTicketData={getTicketData}
                    />
                  )}
                  <button
                    onClick={handleCreateTicket}
                    class="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
                  >
                    Add Add-ons
                  </button>
                </div>

                {Addons.map((addons, index) => (
                  <div className="mt-8" key={index}>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4">
                        <div>
                          <h3 className="text-sm text-gray-900">
                            {addons.name}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">End Date:</dt>
                              <dd className="inline">{addons.endDate}</dd>
                            </div>

                            <div>
                              <dt className="inline">End Time:</dt>
                              <dd className="inline">{addons.endTime}</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <input
                              type="number"
                              min="1"
                              value="1"
                              id="Line1Qty"
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                          <button className="text-gray-600 transition hover:text-red-600">
                            <span className="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                      <hr />
                    </ul>
                  </div>
                ))}
              </>
            )} */}
            {showPromoCode && (
              <>
                <div class="flex justify-end items-center ">
                  {createTicket && (
                    <CreateTicketQickView basicInfoId={basicInfoId} />
                  )}
                  <button
                    onClick={handleCreateTicket}
                    class="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
                  >
                    Add Promo-code
                  </button>
                </div>

                <div className="mt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div>
                        <h3 className="text-sm text-gray-900">
                          Basic Tee 6-Pack
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            value="1"
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <button className="text-gray-600 transition hover:text-red-600">
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                    <hr />
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TicketShowAndManage;
