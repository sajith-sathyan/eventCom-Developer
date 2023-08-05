import React, { useEffect, useState } from "react";
import ImageBar from "../ImageBar/ImageBar";
import CheckOut from "../CheckOut/CheckOut";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Helper/axiosInstance"
function IndexPage(props) {
  const { allData } = props;
  const [showPayment,setShowPayment] = useState(false)
  const [showCheckOut, setShowCheckOut] = useState(false);
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  const Navigate = useNavigate()
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
 useEffect(()=>{
  if(decryptedUserId){
    setShowPayment(true)
  }else{
    setShowPayment(false)
  }
 },[goToCheckOut,setShowCheckOut])
  const goToCheckOut = () => {
    setShowCheckOut(true);
  };
  // BasicInfoData ,EvetnMeidaData TicketData

  if(allData!=null){
    
    var {BasicInfoData,EvetnMeidaData,TicketData} = allData
  }
  console.log("BasicInfoData---------->",BasicInfoData[0].eventImgUrl
  )
  const goToLogin = () =>{
    Navigate("/login")
  }

  return (
    <>
      {showCheckOut ? (
        <CheckOut TicketData={TicketData}  />
      ) : (
       <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:-mx-6">
              <div className="lg:w-3/4 lg:px-6">
                <img
                  className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
                  src={BasicInfoData[0].eventImgUrl}
                  alt=""
                />
                <div>
                  {/* <p className="mt-6 text-sm text-blue-500 uppercase">
                Want to know
              </p> */}
                  <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                    <h1 className="font-semibold text-gray-800 text-3xl md:text-4xl">
                      {BasicInfoData[0].eventTitle}
                    </h1>
                  </h1>

                  <div className="flex items-center mt-6">
                    <img
                      className="object-cover object-center w-10 h-10 rounded-full"
                      // src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                    />

                    <div className="mx-4 b">
                      <h1 className="text-sm text-gray-700 dark:text-gray-200">
                      {BasicInfoData[0].organizerName}
                      </h1>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {BasicInfoData[0].organizerName}
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="flex flex-col lg:items-center justify-center w-full  py-1"></div>
                <br />
                <div>{EvetnMeidaData[0].summary}</div>
                <br />
                <h6 className="font-semibold text-gray-800 text-xl md:text-xl">
                  Description
                </h6>
                <div dangerouslySetInnerHTML={{ __html: EvetnMeidaData[0].description }}></div> 
              </div>
              <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
                <div>
                  {showPayment ? (<div className="rounded-2xl   bg-gradient-to-r  from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                    <div className="block flex items-center justify-center  rounded-xl  bg-white p-4 sm:p-6 lg:p-8">
                      <div
                        onClick={goToCheckOut}
                        className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <svg
                            className="h-5 w-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                          Get Ticket
                        </span>
                      </div>
                    </div>
                  </div>):(<div className="rounded-2xl   bg-gradient-to-r  from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                    <div className="block flex items-center justify-center  rounded-xl  bg-white p-4 sm:p-6 lg:p-8">
                      <div
                        onClick={goToLogin}
                        className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <svg
                            className="h-5 w-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                          Get Ticket
                        </span>
                      </div>
                    </div>
                  </div>)}
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700" />
              </div>
            </div>
          </div>
        </section>

       </div>
        
      )}
      
    </>
  );
}

export default IndexPage;
