import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import {decryptUserId} from "../../Helper/Helper"
import CryptoJS from "crypto-js";



function EventTicket() {
  // console.log(id);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selledTicketInfo, setSelledTicketInfo] = useState(null);
  const [selledTicketID,setSelledTicketId]=useState(null)
  const [TicketUserDetails, setTicketUserDetails] = useState([]);
  
  const divRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();
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

    // get user detials from temporay database
  
    
      
   
  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  useEffect(() => {
    // Access the query parameters from the location object
    const searchParams = new URLSearchParams(location.search);
    const ticketId = searchParams.get("TicketId");
    const ticketName = searchParams.get("TIcketName");
    const totalPrice = searchParams.get("TotalPrice");
    const quantity = searchParams.get("quntity");
    const UserId = searchParams.get("UserId");
    const admissionDetails = searchParams.get("admissionDetails");

    const dataSent = localStorage.getItem("dataSent");
    console.log("admissionDetails--------->",admissionDetails)
    console.log("UserId--------->",UserId )

   
    const GetAdmissionDetails = async (UserId)=>{
      const {data} =await axiosInstance.get(`/getTemporayDataBase?id=${UserId}`)
      
      if(data.userDetails){
        setTicketUserDetails(data.userDetails.admissionDetails)
        console.log("GetAdmissionDetails------>",data.userDetails.admissionDetails)
        if (!dataSent) {
          
          const selledTicket = {  
            UserId: UserId,
            TicketId: ticketId,
            TicketName: ticketName,
            TotalPrice: totalPrice,
            admissionDetails:data.userDetails.admissionDetails,
            Quantity: quantity,
            QrcodeImage:imageUrl
          };
    
          SendDataToSelledTicket(selledTicket,data.userDetails._id);
    
          localStorage.setItem("dataSent", "true");
        }
      }
     
     }
     
     GetAdmissionDetails(decryptedUserId)
    // localStorage.removeItem("dataSent");
    
  }, [location]);
 
 // generate Qr code

 const generateQrCode = async (text) => {
  try {
    const responce = await QRCode.toDataURL(text);
    console.log("responce-->", responce);
    setImageUrl(responce)
    AddQrCodeDataBase(responce,text)

  } catch (err) {
    console.log(err);
  }
};

const AddQrCodeDataBase =async (imageUrl,Id)=>{
const {data} = await axiosInstance.post("/addQrCodeUrl",{imageUrl,Id},{withCredentials:true})
}

  // send data to selled Ticket database

  const SendDataToSelledTicket = async (SelledTicket,TemporaryId) => {
    try {
      const responce = await axiosInstance.post(
        "/AddDataToSelledTicket",
        { SelledTicket },
        { withCredentials: true }
      );
      console.log("responce---->", responce.data);
      generateQrCode(responce.data.selledTicktId);
      setSelledTicketInfo(responce.data.newSelledTicket);
      const {data} =await axiosInstance.post(`/DeleteTemporaryDatabase?id=${TemporaryId}`)
      console.log(data)
      
    } catch (err) {
      console.log(err);
    }
  };

  // help to take the image of ticket
  const captureImage = () => {
    html2canvas(divRef.current).then((canvas) => {
      const image = canvas.toDataURL();
      setImageData(image);
      console.log("imageData--->", imageData);
    });
  };

 
  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };
  if (selledTicketInfo != null) {
    var FormatedStartDate = formatDate(selledTicketInfo.StartDate);
  }
  const Naviaget = useNavigate();
  const removeDataSent = () => {
    localStorage.removeItem("dataSent");
    Naviaget("/");
  };
  console.log("selledTicketInfo--------------->",selledTicketInfo)
  
  return (
    <>
      <div className="flex justify-center mb-4">
        <button onClick={removeDataSent}
          type="button"
          className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 mr-4"
        >
          Go To Home 
        </button>
        <button
          type="button"
          className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 mr-4"
        >
          Button 2
        </button>
        <button
          type="button"
          className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
        >
          Button 3
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div
          ref={divRef}
          className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          {selledTicketInfo != null && (
            <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              {imageUrl ? (
                <div
                  className="w-1/3 bg-fill bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
              ) : (
                ""
              )}
              <div className="w-2/3 p-4 md:p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-black">
                  {selledTicketInfo.TicketName}
                </h1>

                {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit In odit
            </p> */}
                <div>
                  <div className="flex cursor-pointer items-center justify-between">
                    <p className="text-gray-700">
                      <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Date
                      </span>
                      <br />
                      {FormatedStartDate}
                    </p>
                    <p className="text-gray-700">
                      <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Seat
                      </span>
                      <br />
                      {selledTicketInfo.Quantity}
                    </p>
                  </div>
                </div>
                <br />
                <hr className="border border-solid border-black dark:border-black border-opacity-300 font-bold" />

                <div className="flex justify-between mt-3 item-center">
                  <span>
                    <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Location
                    </span>
                    <br />
                   {selledTicketInfo.locationAddress}
                  </span>
                  <h1 className="text-lg font-bold text-gray-700 dark:text-gray-400 md:text-xl">
                    Rs.{selledTicketInfo.TotalPrice}
                  </h1>
                  {/* <div className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                Add to Cart
            </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button onClick={captureImage}>Capture Image</button>
      <br />
      <button >Capture Image</button>
      <br />
    </>
  );
}

export default EventTicket;
