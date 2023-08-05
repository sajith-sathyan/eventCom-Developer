import axios from "axios";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import CardLineChart from "../Graph/Graph";
import CryptoJS from "crypto-js";

import axiosInstance from "../../../Helper/axiosInstance";
function OrgDashboard(props) {
  const [data, setData] = useState(null);
  const [responce, setResponce] = useState("");
  const [showCamara, setShowCamara] = useState(true);
  const [selledTicket, setSelledticket] = useState(null);
  const [count, setCount] = useState(0);
  const [TicketValidation, setTicketValidation] = useState("");
  const { orgEventList, showQrcode, handleQrClick } = props;
  const [render, setStopRender] = useState(true);

  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  // get the user id from local storage
  const userId = localStorage.getItem("userId");
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

  console.log("showQrcode-...--->", showQrcode);
  const QrCodeClick = () => {
    handleQrClick(false);
    setShowCamara(true);
    setResponce(null);
    setTicketValidation("");
    setData(null);
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

  const getSelledTicket = async (userId) => {
    try {
      const { data } = await axiosInstance.get(
        `/getSelledTicketByUserId?id=${userId}`
      );
      console.log("-------------data------------", data);
      setSelledticket(data.response);
      setCount(data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSelledTicket(decryptedUserId);
  }, []);

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

  useEffect(() => {
    if (data) {
      verifyTicket();
    }
  }, [data]);

  if (selledTicket != null) {
    console.log("selledTicket------>");

    var TotalRevinew = 0;
    var AttenetdPeople = 0;

    for (var i = 0; i < selledTicket.length; i++) {
      console.log(selledTicket[i].TotalPrice);
      TotalRevinew += parseFloat(selledTicket[i].TotalPrice);
      AttenetdPeople += parseFloat(selledTicket[i].Quantity);
    }
  }

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Trusted by eCommerce Businesses
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dolores laborum labore provident impedit esse recusandae facere
              libero harum sequi.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total Revenue
                </dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                  Rs.{TotalRevinew}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Evnets
                </dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                  {count}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  People Attented
                </dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                  {AttenetdPeople}
                </dd>
              </div>
            </dl>
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
                  {responce && (
                    <>
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
                              {responce.map((item, index) => (
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
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
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

export default OrgDashboard;
