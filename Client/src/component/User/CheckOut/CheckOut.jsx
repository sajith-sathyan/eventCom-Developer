import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

function CheckOut(props) {
  const { TicketData, allData } = props;
  const [count, setCount] = useState(1);
  const [selectedAdmission, setSelectedAdmisson] = useState(null);
  const [index, setIndex] = useState();
  const [num, setNum] = useState(0);

  const [ticketUserName, setTicketUserName] = useState("");
  const [ticketUserAge, setTicketUserAge] = useState("");
  const [ticketUserAddress,setTicketUserAddress] = useState('')
  const [TicketUserDetails, setTicketUserDetails] = useState([]);
  

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  // function reduce count
  const countMinus = (index) => {
    if (count >= 2) {
      setCount(count - 1);
    }
  };
  // function increment count
  const countPlus = (index) => {
    console.log("index----->", index);
    setCount(count + 1);
  };
  // get the addmisson user take
  const getTicket = (index) => {
    console.log(index);
    console.log(":::    ::::   :::::       ::::", TicketData[0].Addmission[index]);
    setSelectedAdmisson(TicketData[0].Addmission[index]);
    setCount(1);
  };

  // get the user id from local storage
  const userId = localStorage.getItem("userId");
  // dicrypt the userid
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  if (userId) {
    const decryptedKey = CryptoJS.AES.decrypt(
      userId || "no-user-id",
      secretKey
    );
    var decryptedUserId = decryptedKey.toString(CryptoJS.enc.Utf8);
  } else {
    var decryptedUserId = null;
  }
  

  console.log("TicketUserDetails------>", TicketUserDetails);

  if (selectedAdmission != null) {
    var TotalPrice = parseFloat(selectedAdmission.price) * count;
    var detialsToSend = {
      UserId: decryptedUserId,
      TicketId: TicketData[0]._id,
      TIcketName: selectedAdmission.name,
      TotalPrice: TotalPrice,
      quntity: count,
    };  
  }

  // payment with stripe
  const handleStripePayment =async () => {
    console.log("---called----");
    const { data } = await axiosInstance.post(
      "/AddTicketUserDetailsTempInUserDatabase",
      { decryptedUserId, TicketUserDetails },
      { withCredentials: true }
    );
    console.log("------------->data------->",data)
    if(data.savedAdmissionDetails){
      axiosInstance
      .post("/create-checkout-session", detialsToSend)
      .then((res) => {
        console.log("---------get responce fomm backend", res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message); 
      });
    }
  };

  const handleClick = () => {
    if (num < count) {
      setNum(num + 1);
    }

    const admissionDetails = {
      name: ticketUserName,
      age: ticketUserAge,
      address:ticketUserAddress 
    };

    setTicketUserDetails([...TicketUserDetails, admissionDetails]);
    setTicketUserName("");
    setTicketUserAge("");
    setTicketUserAddress('')
  };
  console.log("TicketUserDetails------->", TicketUserDetails);
  return (
    <div>
      <section>
        <h1 className="text-center font-bold text-2xl">Checkout</h1>

        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 py-12 md:py-24">
            <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
              <fieldset className="space-y-4">
                <legend className="sr-only">Delivery</legend>

                <div>
                  {selectedAdmission !== null && (
                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-500 bg-blue p-4 text-sm font-medium shadow-sm hover:border-blue-200 border-blue-500 ring-blue-500">
                      <p className="text-blue-700">{selectedAdmission.name}</p>
                      <p className="text-blue-700">RS.1200</p>
                      <p className="text-gray-900">
                        <div>
                          <label htmlFor="Quantity" className="sr-only"></label>

                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={countMinus}
                              type="button"
                              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            >
                              &minus;
                            </button>

                            <input
                              type="number"
                              id="Quantity"
                              value={count}
                              className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                            />

                            <button
                              onClick={countPlus}
                              type="button"
                              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            >
                              &#43;
                            </button>
                          </div>
                        </div>
                      </p>
                    </div>
                  )}
                </div>
                {TicketData[0].Addmission.map((item, index) => (
                  <div key={index} onClick={() => getTicket(index)}>
                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-500 bg-blue p-4 text-sm font-medium shadow-sm border-blue-200 border-blue-500 ring-blue-500 hover:bg-gray-200 hover:text-blue-700">
                      <p className="text-gray-700">{item.name}</p>
                      <p className="text-gray-700">{item.price}</p>
                    </div>
                  </div>
                ))}
              </fieldset>
            </div>
          </div>
          {/* {selectedAdmission !== null && (
            <div className="bg-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <div className="relative">
                  <label htmlFor="UserEmail" className="sr-only">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="text"
                    id="copen"
                    placeholder="Enter your copone code"
                    className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                  />

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="button"
                      className="rounded-full bg-green-600 p-0.5 text-white hover:bg-green-700"
                    >
                      <span className="sr-only">Submit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  </span>
                </div>
                <br /> <br />
                <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center w-12 bg-emerald-500">
                    <svg
                      className="w-6 h-6 text-white fill-current"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                    </svg>
                  </div>
                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                        Success
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-200">
                        Your account was registered!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>{selectedAdmission.price}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>-£20</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd> {TotalPrice}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="-ms-1 me-1.5 h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <p className="whitespace-nowrap text-xs">
                          2 Discounts Applied
                        </p>
                      </span>
                    </div>
                    <div onClick={handleStripePayment}>
                      <div className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-500 bg-black p-4 text-sm font-medium shadow-sm border-blue-200 border-blue-500 ring-blue-500 hover:bg-gray-900 hover:text-black">
                        <p className="text-gray-700 text-center text-white">
                          Pay With Stripe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
          {selectedAdmission !== null && (
            <>
              {num < count ? (
                <div class="bg-white py-12 md:py-24">
                  <div class="mx-auto max-w-lg px-4 lg:px-8">
                    <h1>num : {num + 1}</h1>
                    <form class="grid grid-cols-6 gap-4">
                      <div class="col-span-3">
                        <label
                          for="FirstName"
                          class="block text-xs font-medium text-gray-700"
                        >
                          First Name
                        </label>

                        <input
                          value={ticketUserName}
                          type="text"
                          id="FirstName"
                          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          onChange={(e) => setTicketUserName(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6">
                        <label
                          for="age"
                          class="block text-xs font-medium text-gray-700"
                        >
                          age
                        </label>

                        <input
                          value={ticketUserAge}
                          type="Number"
                          id="age"
                          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          onChange={(e) => setTicketUserAge(e.target.value)}
                        />
                      </div>


                      <div class="col-span-6">
                        <label
                          for="Address"
                          class="block text-xs font-medium text-gray-700"
                        >
                          address
                        </label>

                        <input            
                          value={ticketUserAddress}
                          type="text"
                          id="age"
                          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          onChange={(e) => setTicketUserAddress(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6">
                        <br />
                        <br />
                      </div>
                    </form>
                    <button
                      onClick={handleClick}
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white py-12 md:py-24">
                  <div className="mx-auto max-w-lg px-4 lg:px-8">
                    {/* <div className="relative">
                      <label htmlFor="UserEmail" className="sr-only">
                        {" "}
                        Email{" "}
                      </label>

                      <input
                        type="text"
                        id="copen"
                        placeholder="Enter your copone code"
                        className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />

                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="rounded-full bg-green-600 p-0.5 text-white hover:bg-green-700"
                        >
                          <span className="sr-only">Submit</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                        </button>
                      </span>
                    </div> */}
                    <br /> <br />
                    {/* <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex items-center justify-center w-12 bg-emerald-500">
                        <svg
                          className="w-6 h-6 text-white fill-current"
                          viewBox="0 0 40 40"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                        </svg>
                      </div>
                      <div className="px-4 py-2 -mx-3">
                        <div className="mx-3">
                          <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                            Success
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            Your account was registered!
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                      <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd>{selectedAdmission.price}</dd>
                          </div>

                          <div className="flex justify-between">
                            <dt>Discount</dt>
                            <dd>-£20</dd>
                          </div>

                          <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd> {TotalPrice}</dd>
                          </div>
                        </dl>

                        <div className="flex justify-end">
                          <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-xs">
                              2 Discounts Applied
                            </p>
                          </span>
                        </div>
                        <div onClick={handleStripePayment}>
                          <div className="flex cursor-pointer items-center justify-between rounded-lg border border-blue-500 bg-black p-4 text-sm font-medium shadow-sm border-blue-200 border-blue-500 ring-blue-500 hover:bg-gray-900 hover:text-black">
                            <p className="text-gray-700 text-center text-white">
                              Pay With Stripe
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default CheckOut;
