import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

import axiosInstance from "../../../Helper/axiosInstance"
import axios from "axios";
import { decryptUserId } from "../../../Helper/Helper";
function OrgEventList(props) {
  const [getId, setGetId] = useState();
  const [state, setState] = useState(false);
  const [responce, setResponce] = useState("");
  const naviagte = useNavigate();
  const [data, setData] = useState(null);
  const [showCamara, setShowCamara] = useState(true);
  const { showQrcode, handleQrClick ,UserId } = props;
  const [orgEventList, setOrgEventList] = useState(null);
  const [render, setStopRender] = useState(true);
  const [TicketValidation, setTicketValidation] = useState('');
  console.log("showQrcode-...--->", showQrcode);
  const QrCodeClick = () => {
    handleQrClick(false);
    setShowCamara(true);
    setData(null);
  };

 

  // fetch orgnizer event data
  const featchOrgEvent = async (userId) => {
    try {
      const orgEventList = await axiosInstance.get(
        `/orgEventList?id=${userId}`
      );
      console.log("orgEventList---->", orgEventList.data);
      setOrgEventList(orgEventList.data);
    } catch (err) {
      console.log(err, "featchOrgEvent -->ERROR");
    }
  };
  useEffect(() => {
    featchOrgEvent(UserId);
  }, []);
  // delete event
  const DeleteEvent = async (BasicInfoId) => {
    try {
      console.log("delete work");
      console.log(BasicInfoId);
      const { data } = await axiosInstance.post(
        `/DeleteEvent?id=${BasicInfoId}`
      );
      console.log("-----data----->", data);
      if (data) {
        featchOrgEvent(UserId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // function for qr code scanner

  const onResult = (result, error) => {
    if (result) {
      console.log(result);
      if (result.text) {
        setData(result.text);
        setShowCamara(false);
      }
    }

    if (!error) {
      console.log(error);
    }
  };

  // verify this ticket
  const verifyTicket = async () => {
    try {
      const responce = await axiosInstance.get(
        `/getDataFromSelledTicket?id=${data}`
      );
      console.log("responce---->", responce);
      if (render) {
        
        if (responce.data.SelledTicketData.admissionDetails) {
          setResponce(responce.data.SelledTicketData.admissionDetails);
          setStopRender(false);
        } else if (responce.data.TicketValidation) {
          
          setTicketValidation(responce.data.TicketValidation);
          console.log("TicketValidation--------:::-------->", TicketValidation);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (data) {
    verifyTicket();
  }
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Events
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {orgEventList != null && (
                  <>
                    {orgEventList.map((event, index) => (
                      <li className="flex items-center gap-4">
                        <img
                          src={event.eventImgUrl}
                          alt=""
                          className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                          <a href={`/organizations/${event._id}/editEvent`}>
                            <h3 className="text-sm text-gray-900">
                              {event.eventTitle}
                            </h3>
                          </a>

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
                          <button
                            onClick={() => DeleteEvent(event._id)}
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
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {showQrcode && (
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={QrCodeClick}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                  <h4 className="text-lg font-medium text-gray-800">
                    {" "}
                    Scan your Qr Code
                  </h4>
                  <button
                    className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                    onClick={QrCodeClick}
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
                {showCamara && (
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48">
                      <QrReader onResult={onResult} className="w-full" />
                    </div>
                  </div>
                )}

                <h1
                  className="text-center font-bold"
                  style={{ color: "blue", fontSize: "24px", marginTop: "10px" }}
                >
                  Scanned webcam:{" "}
                  {responce && (
                    <>
                      {responce.map((item, index) => (
                        <>
                          <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                              <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Name
                                  </th>
                                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Age
                                  </th>
                                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Address
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {item.name}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.age}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.address}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </h1>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrgEventList;
