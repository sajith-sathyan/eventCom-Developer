import React, { useCallback, useEffect, useState } from "react";
import EventEditNavBar from "../EventEditNavBar/EventEditNavBar";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../../../Helper/axiosInstance"
function  EditEvent(props) {
  //------------------------------------EVENT NAV BAR-------------------------------------------------------
  const { allEventData } = props;
  console.log(allEventData);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showBookedUser, setShowBookedUser] = useState(false);

  const [BasicInfo, setBasicInfo] = useState(true);
  const [EventMedia, setEventMedia] = useState(false);
  const [Ticket, setTicket] = useState(false);
  const [bookedUser, setBookedUser] = useState(false);
  const [data, setData] = useState(null);

  // Qr code
  const [responce, setResponce] = useState("");
  const [showCamara, setShowCamara] = useState(true);
  const { orgEventList, showQrcode, handleQrClick } = props;

  console.log("showQrcode-...--->", showQrcode);
  const QrCodeClick = () => {
    handleQrClick(false);
    setShowCamara(true);
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

  // verify this ticket
  const verifyTicket = async () => {
    try {
      const responce = await axiosInstance.get(
        `/getDataFromSelledTicket?id=${data}`
      );
      console.log("responce---->", responce);
      setResponce(responce.data.TicketValidation);
    } catch (err) {
      console.log(err);
    }
  };

  if (data) {
    verifyTicket();
  }

  //pathToBasicIfo
  const pathToBasicIfo = () => {
    setShowBasicInfo(true);
    setShowEventMedia(false);
    SetShowTicket(false);
    setShowBookedUser(false);

    setBasicInfo(true);
    setEventMedia(false);
    setTicket(false);
    setBookedUser(false);
  };
  // pathEventMedia
  const pathEventMedia = () => {
    setShowBasicInfo(false);
    setShowEventMedia(true);
    SetShowTicket(false);
    setShowBookedUser(false);

    setBasicInfo(false);
    setEventMedia(true);
    setTicket(false);
    setBookedUser(false);
  };
  //pathToTicket
  const pathToTicket = () => {
    setShowBasicInfo(false);
    setShowEventMedia(false);
    SetShowTicket(true);
    setShowBookedUser(false);

    setBasicInfo(false);
    setEventMedia(false);
    setTicket(true);
    setBookedUser(false);
  };

  // path to booked user
  const pathToBookedUser = () => {
    setShowBasicInfo(false);
    setShowEventMedia(false);
    SetShowTicket(false);
    setShowBookedUser(true);

    setBasicInfo(false);
    setEventMedia(false);
    setTicket(false);
    setBookedUser(true);
  };
  //-------------------------------------BASIC INFO-----------------------------------------------------
  const [eventTitle, setTitle] = useState(
    allEventData.BasicInfoData[0].eventTitle
  );
  const [organizerName, setOrganizerName] = useState(
    allEventData.BasicInfoData[0].organizerName
  );
  const [type, setType] = useState(allEventData.BasicInfoData[0].type);
  const [category, setCategory] = useState(allEventData.BasicInfoData[0].type);
  // location
  const [venueStatus, setVenue] = useState(false);
  const [onlineEstatus, setOnlineEstatus] = useState(false);
  //data and time
  const [startDate, setStartDate] = useState(
    allEventData.BasicInfoData[0].startDate
  );
  const [startTime, setStartTime] = useState(
    allEventData.BasicInfoData[0].startTime
  );
  const [endDate, setEndDate] = useState(allEventData.BasicInfoData[0].endDate);
  const [endTime, setEndTime] = useState(allEventData.BasicInfoData[0].endTime);
  const [Status, setStatus] = useState("");

  const [showBasicInfo, setShowBasicInfo] = useState(true);
  const [ShowEventMedia, setShowEventMedia] = useState(false);
  const [showTicket, SetShowTicket] = useState(false);

  const BasicInfoUpdate = () => {
    const responce = axiosInstance.post(
      `/updataBasicInfo?id=${allEventData.BasicInfoData[0]._id}`,
      {
        eventTitle,
        organizerName,
        type,
        category,
        latitude: allEventData.BasicInfoData.latitude,
        longitude: allEventData.BasicInfoData.longitude,
        startDate,
        startTime,
        endDate,
        endTime,
      },
      { withCredentials: true }
    );
    console.log(responce.data);
  };
  //---------------------------------EVENT MEDIA---------------------------------------------------------

  const [text, setText] = useState(allEventData.EvetnMeidaData[0].description);
  const [Image, setImage] = useState(null);
  const [url, setUrl] = useState(allEventData.EvetnMeidaData[0].eventImgUrl);
  const [summary, setSummary] = useState(allEventData.EvetnMeidaData[0].summary);
  const [showFile, setShowFile] = useState(true);
  const [imgageValidation, setImageValidation] = useState(false);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleImgeSubmitt = (e) => {
    setImageValidation(false);
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = selectedFile.name
        .split(".")
        .pop()
        .toLowerCase();

      // Validate file extension
      if (allowedExtensions.includes(fileExtension)) {
        setImage(selectedFile);
        setShowFile(false);
      } else {
        setImageValidation(true);
        console.log(
          "Invalid file format. Only JPEG, JPG, and PNG files are allowed."
        );
      }
    }
  };

  const handleImageSubmit = (e) => {
    try {
      const imageRef = ref(storage, Image.name);
      uploadBytes(imageRef, Image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              console.log("url ------ >> ", url);

              setUrl(url);
              setShowFile(false);
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleImageSubmit();
  }, [url]);
  const updateBasicInfo = async () => {
    const { data } = await axiosInstance.post(
      `/updateEventMedia?id=${allEventData.BasicInfoData._id}`,
      { url, summary, text },
      { withCredentials: true }
    );
  };

  //-------------------------------------------TICKET----------------------------------------------------

  const [createTicket, setCreateTicket] = useState(false);
  const [showAdmisson, setAdmission] = useState(false);
  const [Addons, setAddons] = useState([]);
  const [showAdons, setAdons] = useState(false);
  const [showPromoCode, setPromoCode] = useState(false);
  const [admission, setAdmisson] = useState([]);
  const [childData, setChildData] = useState(false);
  const Naviagte = useNavigate();
  const handleCreateTicket = () => {
    if (createTicket) {
      setCreateTicket(false);
    } else {
      setCreateTicket(true);
    }
  };

  const getAdmissionData = (status) => {
    setChildData(status);
  };

  const pathToAdmission = () => {
    setAdmission(true);
    setAdons(false);
    setPromoCode(false);
  };

  const pathToAddons = () => {
    setAdmission(false);
    setAdons(true);
    setPromoCode(false);
  };

  const pathToPromoCode = () => {
    setAdmission(false);
    setAdons(false);
    setPromoCode(true);
  };

  const goToPublish = () => {
    Naviagte("  ");
  };

  //--------     create ticket   --------------
  const { basicInfoId } = props;
  const [index, setIndex] = useState(0);
  const getIndex = (index) => {
    setIndex(index);
    setCreateTicket(true);
  };
  console.log("basicInfoId--qickview-> ", basicInfoId); 
  const [state, setState] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  console.log("allEventData................>>" ,allEventData.TicketData)
  // const [name, setName] = useState(  
  //   allEventData.TicketData.Addmission[index].name
  // );
  // const [quantity, setQuantity] = useState(
  //   allEventData.TicketData.Addmission[index].quantity
  // );
  // const [price, setPrice] = useState(
  //   allEventData.TicketData.Addmission[index].price
  // );
  // const [CreateTikcketStartDate, setCreateTikcketStartDate] = useState(
  //   allEventData.TicketData.Addmission[index].startDate
  // );
  // const [CreateTikcketStartTime, setCreateTikcketStartTime] = useState(
  //   allEventData.TicketData.Addmission[index].startTime
  // );
  // const [CreateTikcketEndDate, setCreateTikcketEndDate] = useState(
  //   allEventData.TicketData.Addmission[index].endDate
  // );
  // const [CreateTikcketEndTime, setCreateTikcketEndTime] = useState(
  //   allEventData.TicketData.Addmission[index].endTime
  // );
  const [ticketStatus, setTicketStatus] = useState();
  const [error, setError] = useState("");
  console.log("paid---->", paid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const responce = await axiosInstance.post(
    //     `/UpdateAdmission?id=${allEventData.BasicInfoData._id}`,
    //     {
    //       basicInfoId,
    //       ticketStatus,
    //       name,
    //       quantity,
    //       price,
    //       CreateTikcketStartDate,
    //       CreateTikcketStartTime,
    //       CreateTikcketEndDate,
    //       CreateTikcketEndTime,
    //     },
    //     { withCredentials: true }
    //   );
    //   console.log("responce----->", responce);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleFree = () => {
    setTicketStatus("free");
    if (free) {
      setFree(false);
    } else {
      setFree(true);    
      setPaid(false);
    }
  };
  const handlePaid = () => {
    setTicketStatus("paid");

    if (paid) {
      setPaid(false);
    } else {
      setPaid(true);
      setFree(false);
    }
  };

  //----------------------------------------Booked user---------------------------------------------------------==

  const [bookedUserDetials, setBookedUserDetials] = useState(null);
  const [admissionDetails, setAdmissionDetails] = useState([]);
  useEffect(() => {
    // getBookedUserDetials detials
    const getBookedUserDetials = async (EventMediaId) => {
      const { data } = await axiosInstance.get(
        `/getBookedUserDetials?id=${EventMediaId}`
      );
      console.log("data------>", data);
      if (data.getBookedUserDetails) {
        setBookedUserDetials(data.getBookedUserDetails);
      }
    };
    getBookedUserDetials(allEventData.BasicInfoData[0].EventMediaId);
  }, [allEventData.BasicInfoData.EventMediaId]);
  // set error messge for event tittle
  const [errorMessage, setErrorMessage] = useState("");
  console.log("bookedUserDetials---------->", bookedUserDetials);
  console.log("admissionDetails-admissionDetails->", admissionDetails);

  return (
    <>
      <div>
        <div>
          <div>
            {/* Navigation starts */}
            {/* Mobile */}
            <div
              className={
                show
                  ? "w-full h-full absolute z-40  transform  translate-x-0 "
                  : "   w-full h-full absolute z-40  transform -translate-x-full"
              }
            >
              <div
                className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full"
                onClick={() => setShow(!show)}
              />
              <div className="w-64 z-20 absolute left-0 z-40 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
                <div className="flex flex-col justify-between h-full">
                  <div className="px-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          aria-label="Home"
                          id="logo"
                          enableBackground="new 0 0 300 300"
                          height={43}
                          viewBox="0 0 300 300"
                          width={43}
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g>
                            <path
                              fill="#4c51bf"
                              d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                            />
                          </g>
                        </svg>
                        <p className="text-bold md:text2xl text-base pl-3 text-gray-800">
                          Event Com
                        </p>
                      </div>
                      <div
                        id="cross"
                        className=" text-gray-800"
                        onClick={() => setShow(!show)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-x"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      <a>
                        <li className="text-white pt-8">
                          <div className="flex items-center">
                            <div className="md:w-6 md:h-6 w-5 h-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M7.16667 3H3.83333C3.3731 3 3 3.3731 3 3.83333V7.16667C3 7.6269 3.3731 8 3.83333 8H7.16667C7.6269 8 8 7.6269 8 7.16667V3.83333C8 3.3731 7.6269 3 7.16667 3Z"
                                  stroke="#667EEA"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7.16667 11.6667H3.83333C3.3731 11.6667 3 12.0398 3 12.5V15.8333C3 16.2936 3.3731 16.6667 3.83333 16.6667H7.16667C7.6269 16.6667 8 16.2936 8 15.8333V12.5C8 12.0398 7.6269 11.6667 7.16667 11.6667Z"
                                  stroke="#667EEA"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.1667 11.6667H12.8333C12.3731 11.6667 12 12.0398 12 12.5V15.8334C12 16.2936 12.3731 16.6667 12.8333 16.6667H16.1667C16.6269 16.6667 17 16.2936 17 15.8334V12.5C17 12.0398 16.6269 11.6667 16.1667 11.6667Z"
                                  stroke="#667EEA"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.1667 3H12.8333C12.3731 3 12 3.3731 12 3.83333V7.16667C12 7.6269 12.3731 8 12.8333 8H16.1667C16.6269 8 17 7.6269 17 7.16667V3.83333C17 3.3731 16.6269 3 16.1667 3Z"
                                  stroke="#667EEA"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-indigo-500 ml-3 text-lg">
                              Dashboard
                            </p>
                          </div>
                        </li>
                      </a>
                      <a>
                        <li className="text-gray-700 pt-8">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <div className="md:w-6 md:h-6 w-5 h-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <path
                                    d="M2.33333 4.83333H4.83333C5.05435 4.83333 5.26631 4.74554 5.42259 4.58926C5.57887 4.43298 5.66667 4.22101 5.66667 4V3.16667C5.66667 2.72464 5.84226 2.30072 6.15482 1.98816C6.46738 1.67559 6.89131 1.5 7.33333 1.5C7.77536 1.5 8.19928 1.67559 8.51184 1.98816C8.8244 2.30072 9 2.72464 9 3.16667V4C9 4.22101 9.0878 4.43298 9.24408 4.58926C9.40036 4.74554 9.61232 4.83333 9.83333 4.83333H12.3333C12.5543 4.83333 12.7663 4.92113 12.9226 5.07741C13.0789 5.23369 13.1667 5.44565 13.1667 5.66667V8.16667C13.1667 8.38768 13.2545 8.59964 13.4107 8.75592C13.567 8.9122 13.779 9 14 9H14.8333C15.2754 9 15.6993 9.17559 16.0118 9.48816C16.3244 9.80072 16.5 10.2246 16.5 10.6667C16.5 11.1087 16.3244 11.5326 16.0118 11.8452C15.6993 12.1577 15.2754 12.3333 14.8333 12.3333H14C13.779 12.3333 13.567 12.4211 13.4107 12.5774C13.2545 12.7337 13.1667 12.9457 13.1667 13.1667V15.6667C13.1667 15.8877 13.0789 16.0996 12.9226 16.2559C12.7663 16.4122 12.5543 16.5 12.3333 16.5H9.83333C9.61232 16.5 9.40036 16.4122 9.24408 16.2559C9.0878 16.0996 9 15.8877 9 15.6667V14.8333C9 14.3913 8.8244 13.9674 8.51184 13.6548C8.19928 13.3423 7.77536 13.1667 7.33333 13.1667C6.89131 13.1667 6.46738 13.3423 6.15482 13.6548C5.84226 13.9674 5.66667 14.3913 5.66667 14.8333V15.6667C5.66667 15.8877 5.57887 16.0996 5.42259 16.2559C5.26631 16.4122 5.05435 16.5 4.83333 16.5H2.33333C2.11232 16.5 1.90036 16.4122 1.74408 16.2559C1.5878 16.0996 1.5 15.8877 1.5 15.6667V13.1667C1.5 12.9457 1.5878 12.7337 1.74408 12.5774C1.90036 12.4211 2.11232 12.3333 2.33333 12.3333H3.16667C3.60869 12.3333 4.03262 12.1577 4.34518 11.8452C4.65774 11.5326 4.83333 11.1087 4.83333 10.6667C4.83333 10.2246 4.65774 9.80072 4.34518 9.48816C4.03262 9.17559 3.60869 9 3.16667 9H2.33333C2.11232 9 1.90036 8.9122 1.74408 8.75592C1.5878 8.59964 1.5 8.38768 1.5 8.16667V5.66667C1.5 5.44565 1.5878 5.23369 1.74408 5.07741C1.90036 4.92113 2.11232 4.83333 2.33333 4.83333"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p className="text-gray-700 ml-3 text-lg">
                                Products
                              </p>
                            </div>
                            <div onClick={() => setProduct(!product)}>
                              {product ? (
                                <div className=" ml-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-up"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <polyline points="6 15 12 9 18 15" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="ml-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-down"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          {product ? (
                            <div>
                              <ul className="my-3">
                                <li className="text-sm text-indigo-500 py-2 px-6">
                                  Best Sellers
                                </li>
                                <li className="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6">
                                  Out of Stock
                                </li>
                                <li className="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6">
                                  New Products
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </a>
                      <a>
                        <li className="text-gray-800 pt-8">
                          <div className="flex items-center">
                            <div className="md:w-6 md:h-6 w-5 h-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M6.66667 13.3333L8.33334 8.33334L13.3333 6.66667L11.6667 11.6667L6.66667 13.3333Z"
                                  stroke="currentColor"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                  stroke="currentColor"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-gray-800 ml-3 text-lg">
                              Performance
                            </p>
                          </div>
                        </li>
                      </a>
                      <a>
                        <li className="text-gray-800 pt-8">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <div className="md:w-6 md:h-6 w-5 h-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M5.83333 6.66667L2.5 10L5.83333 13.3333"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14.1667 6.66667L17.5 10L14.1667 13.3333"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.6667 3.33333L8.33333 16.6667"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p className="text-gray-800 ml-3 text-lg">
                                Deliverables
                              </p>
                            </div>
                            <div onClick={() => setDeliverables(!deliverables)}>
                              {deliverables ? (
                                <div className=" ml-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-up"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <polyline points="6 15 12 9 18 15" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="ml-4">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-down"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          {deliverables ? (
                            <div>
                              <ul className="my-3">
                                <li className="text-sm text-indigo-500 py-2 px-6">
                                  Best Sellers
                                </li>
                                <li className="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6">
                                  Out of Stock
                                </li>
                                <li className="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6">
                                  New Products
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      </a>
                    </ul>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-center mb-4 w-full px-6">
                      <div className="relative w-full">
                        <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-search"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="#A0AEC0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={10} cy={10} r={7} />
                            <line x1={21} y1={21} x2={15} y2={15} />
                          </svg>
                        </div>
                        <input
                          className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2"
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <div className="border-t border-gray-300">
                      <div className="w-full flex items-center justify-between px-6 pt-1">
                        <div className="flex items-center">
                          <img
                            alt="profile-pic"
                            src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                            className="w-8 h-8 rounded-md"
                          />
                          <p className=" text-gray-800 text-base leading-4 ml-2">
                            Jane Doe
                          </p>
                        </div>
                        <ul className="flex">
                          <li className="cursor-pointer text-white pt-5 pb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-messages"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="#718096"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                              <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                            </svg>
                          </li>
                          <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-bell"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="#718096"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile */}

            {/* Navigation ends */}
            {/* Page title starts */}

            <div className="bg-gray-200 w-full">
              <div className="container px-6 py-6 sm:py-0 mx-auto">
                <div className="sm:hidden bg-white w-full relative">
                  <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-selector"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#A0AEC0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="8 9 12 5 16 9" />
                      <polyline points="16 15 12 19 8 15" />
                    </svg>
                  </div>
                  <select
                    aria-label="Selected tab"
                    className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10"
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      switch (selectedValue) {
                        case "basicInfo":
                          pathToBasicIfo();
                          break;
                        case "eventMedia":
                          pathEventMedia();
                          break;
                        case "ticket":
                          pathToTicket();
                          break;
                        case "bookedUser":
                          pathToBookedUser();
                          break;
                        default:
                          // Handle any other cases or fallback behavior
                          break;
                      }
                    }}
                  >
                    <option
                      value="basicInfo"
                      selected
                      className="text-sm text-gray-600"
                    >
                      Basic Info
                    </option>

                    <option
                      value="eventMedia"
                      className="text-sm text-gray-600"
                    >
                      Event Media
                    </option>

                    <option value="ticket" className="text-sm text-gray-600">
                      Ticket
                    </option>

                    <option
                      value="bookedUser"
                      className="text-sm text-gray-600"
                    >
                      Booked User
                    </option>
                  </select>
                </div>
                <ul className="hidden sm:flex flex-row pt-8">
                  {BasicInfo ? (
                    <li
                      onClick={pathToBasicIfo}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-white text-sm text-gray-800"
                    >
                      Basic Info
                    </li>
                  ) : (
                    <li
                      onClick={pathToBasicIfo}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-gray-300 mr-1 text-sm text-gray-800"
                    >
                      Basic Info
                    </li>
                  )}

                  {EventMedia ? (
                    <li
                      onClick={pathEventMedia}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-white text-sm text-gray-800"
                    >
                      Event Media
                    </li>
                  ) : (
                    <li
                      onClick={pathEventMedia}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-gray-300 mr-1 text-sm text-gray-800"
                    >
                      Event Media
                    </li>
                  )}

                  {Ticket ? (
                    <li
                      onClick={pathToTicket}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-white text-sm text-gray-800"
                    >
                      Ticket
                    </li>
                  ) : (
                    <li
                      onClick={pathToTicket}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-gray-300 mr-1 text-sm text-gray-800"
                    >
                      Ticket
                    </li>
                  )}

                  {bookedUser ? (
                    <li
                      onClick={pathToBookedUser}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-white text-sm text-gray-800"
                    >
                      Booked User
                    </li>
                  ) : (
                    <li
                      onClick={pathToBookedUser}
                      className="rounded-t w-32 h-12 flex items-center justify-center bg-gray-300 mr-1 text-sm text-gray-800"
                    >
                      Booked User
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Page title ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
          </div>
        </div>
      </div>

      {/* --------------------------------------BASIC INFO-------------------------------------------------- */}
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
                    <p style={{ color: "red" }}>{responce}</p>
                  </>
                )}
              </h1>
            </div>
          </div>
        </div>
      )}
      {showBasicInfo && (
        <div>
          {allEventData.BasicInfoData && (
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
                        maxLength={49}
                        className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="Be clear and descriptive"
                        onChange={(e) => setTitle(e.target.value)}
                        value={eventTitle}
                      />
                      {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">
                          {errorMessage}
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
                        value={organizerName}
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
                        <option value="Type">{type}</option>

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
                        <option value="Festival or Fair">
                          Festival or Fair
                        </option>
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
                        <option value="Type">{category}</option>

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
                      <div className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                        Venue
                      </div>
                    )}
                    {!venueStatus && (
                      <div className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                        Online event
                      </div>
                    )}
                  </div>
                  <br />
                  {venueStatus && (
                    <div className="flex flex-col mb-6">
                      <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>
                        {/* <LoctionSearch onSendCoordinates={handleCoordinates} /> */}
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
                    <div className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400">
                      Recurring Event
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
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                      />
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
                        value={startTime}
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
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      />
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
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <dir className="flex flex-col mb-6">
                    <button
                      onClick={BasicInfoUpdate}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-items-end"
                    >
                      Submitt
                    </button>
                  </dir>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* -----------------------------------------EVENT MEDIA---------------------------------------------- */}
      {ShowEventMedia && (
        <div>
          {allEventData.EvetnMeidaData && (
            <div className=" ">
              <main className="flex items-center justify-center  px-4 py-8">
                {/* <h1 className="text-5xl font-bold text-gray-500">In progress</h1> */}
                {/* Content */}
                {/* component */}

                <div className="container max-w-screen-lg  mx-auto sm:w-full">
                  <div>
                    <div className="bg-white rounded shadow-lg px-4 md:p-8 mb-6">
                      <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                        Event media
                      </div>
                      <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                        <br />
                        Add photos to show what your event will be about. You
                        can upload up to 10 images.
                      </span>
                      <br />
                      <br />
                      <div className="border border-dashed border-gray-500 relative">
                        <div className="relative">
                          <>
                            <img
                              className="object-cover w-full h-56 sm:h-96"
                              src={url}
                              alt=""
                            />
                          </>
                        </div>
                      </div>
                      <br />
                      <div className="border border-dashed border-gray-500 relative">
                        <input
                          onChange={handleImgeSubmitt}
                          type="file"
                          multiple=""
                          className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50 "
                          required
                        />
                        <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto ">
                          <h4>
                            change the event image
                            <br />
                            or
                          </h4>
                          <p className="">Select Files</p>
                        </div>
                      </div>
                      <div
                        onClick={handleImageSubmit}
                        className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                        href="/download"
                      >
                        <span className="absolute -end-full transition-all group-hover:end-4">
                          <svg
                            className="h-5 w-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:me-4">
                          Add
                        </span>
                      </div>
                      <br />
                      <br />
                      <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                        Summary
                      </div>
                      <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                        <br />
                        Grab people's attention with a short description about
                        your event. Attendees will see this at the top of your
                        event page. (140 characters max)
                      </span>
                      <>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your message
                        </label>
                        <textarea
                          id="message"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          defaultValue={""}
                          name="summary"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          required
                        />
                      </>
                      {/* <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 p-4">
                          <div className="bg-gray-200 h-10 md:h-15" />
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                          <div className="bg-gray-200 h-10 md:h-15" />
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                          <div className="bg-gray-200 h-10 md:h-15" />
                        </div>
                      </div> */}
                      <br />
                      <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                        Description
                      </div>
                      <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                        <br />
                        Add more details to your event like your schedule,
                        sponsors, or featured guests
                      </span>
                      <br /> <br />
                      <div className="h-128">
                        <div className="mb-1 text-xs sm:text-sm tracking-wide ">
                          <ReactQuill
                            className="editor-input"
                            theme="snow"
                            onChange={setText}
                            modules={modules}
                            value={text}
                            required
                          />
                        </div>
                      </div>
                      {/* <h1>content</h1>
                      <div dangerouslySetInnerHTML={{__html: text}}></div> */}
                      <br />
                      <br />
                      {/* <div class="text-center">
                        <p class="text-red-500  ">
                          "You cannot submit this form because you have not
                          filled in all the required fields."
                        </p>
                      </div> */}
                      <br />
                      <br />
                      <br />
                      <div className="flex flex-col px-10 mb-6 justify-items-end">
                        <button
                          onClick={updateBasicInfo}
                          type="button"
                          className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 justify-self-end self-end"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      )}
      {/* -----------------------------------------TICKET-------------------------------------------- */}
      {showTicket && (
        <div>
          {allEventData.TicketData && (
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
                            <p class="text-gray hover:text-indigo-600">
                              Admission
                            </p>
                          )}
                        </li>

                        <li onClick={pathToPromoCode}>
                          {showPromoCode ? (
                            <p class="text-indigo-600">Promo-code</p>
                          ) : (
                            <p class="text-gray hover:text-indigo-600">
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
                           {/* {createTicket && (
                            <CreateTicketQickView
                              basicInfoId={basicInfoId}
                              getAdmissionData={getAdmissionData}
                              getTicketData={getTicketData}
                            />
                          )}  */}
                         <button
                            onClick={handleCreateTicket}
                            class="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
                          >
                            Create Ticket
                          </button> 
                        </div>

                        {createTicket && (
                          <>  </>
                          // <div className="fixed absolute inset-0 z-50 overflow-y-auto h-500 w-500">
                          //   <div
                          //     className="fixed inset-0 w-full h-full bg-black opacity-40"
                          //     onClick={handleCreateTicket}
                          //   ></div>
                          //   <div className="flex items-center min-h-screen px-4 py-8">
                          //     <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                          //       <div className="flex items-center justify-between p-4 border-b">
                          //         <h4 className="text-lg font-medium text-gray-800">
                          //           Add tickets
                          //         </h4>
                          //         <button
                          //           className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                          //           onClick={handleCreateTicket}
                          //         >
                          //           <svg
                          //             xmlns="http://www.w3.org/2000/svg"
                          //             className="w-5 h-5 mx-auto"
                          //             viewBox="0 0 20 20"
                          //             fill="currentColor"
                          //           >
                          //             <path
                          //               fillRule="evenodd"
                          //               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          //               clipRule="evenodd"
                          //             />
                          //           </svg>
                          //         </button>
                          //       </div>
                          //       <div className="flex items-center gap-3 p-4  border-t">
                          //         {free ? (
                          //           <button
                          //             onClick={handleFree}
                          //             className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          //           >
                          //             Free
                          //           </button>
                          //         ) : (
                          //           <button
                          //             onClick={handleFree}
                          //             className="px-6 py-2 text-[12.5px]   text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          //           >
                          //             Free
                          //           </button>
                          //         )}

                          //         {paid ? (
                          //           <button
                          //             onClick={handlePaid}
                          //             className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          //           >
                          //             Paid
                          //           </button>
                          //         ) : (
                          //           <button
                          //             onClick={handlePaid}
                          //             className="px-6 py-2 text-[12.5px]   text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          //           >
                          //             Paid
                          //           </button>
                          //         )}
                          //       </div>
                          //       <div className="space-y-2 p-4  text-[12.5px] leading-relaxed text-gray-500">
                          //         <div>
                          //           <label className="font-medium">Name</label>
                          //           <input
                          //             type="text"
                          //             value={name}
                          //             required
                          //             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          //             onChange={(e) => setName(e.target.value)}
                          //           />
                          //         </div>
                          //         <div>
                          //           <label className="font-medium">
                          //             Available Quanity
                          //           </label>
                          //           <input
                          //             value={quantity}
                          //             type="Number"
                          //             required
                          //             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          //             onChange={(e) =>
                          //               setQuantity(e.target.value)
                          //             }
                          //           />
                          //         </div>
                          //         <div>
                          //           <label className="font-medium">Price</label>
                          //           <input
                          //             value={price}
                          //             onChange={(e) => setPrice(e.target.value)}
                          //             type="Number"
                          //             required
                          //             className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          //           />
                          //         </div>
                          //         <div className="flex flex-row ">
                          //           <div>
                          //             <label
                          //               htmlFor="email"
                          //               className="mb-1 text-[12.5px]sm:text-sm tracking-wide text-black-600"
                          //             >
                          //               {" "}
                          //               Sales Start Date*{" "}
                          //             </label>
                          //             <input
                          //               onChange={(e) =>
                          //                 setCreateTikcketStartDate(
                          //                   e.target.value
                          //                 )
                          //               }
                          //               value={CreateTikcketStartDate}
                          //               type="date"
                          //               name=""
                          //               id=""
                          //               className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                          //             />
                          //           </div>
                          //           <div>
                          //             <label
                          //               htmlFor="email"
                          //               className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                          //             >
                          //               {" "}
                          //               Sales Start Time*{" "}
                          //             </label>
                          //             <input
                          //               onChange={(e) =>
                          //                 setCreateTikcketStartTime(
                          //                   e.target.value
                          //                 )
                          //               }
                          //               value={CreateTikcketStartTime}
                          //               type="time"
                          //               name=""
                          //               id=""
                          //               className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                          //             />
                          //           </div>
                          //         </div>
                          //         <div className="flex flex-row ">
                          //           <div>
                          //             <label
                          //               htmlFor="email"
                          //               className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                          //             >
                          //               {" "}
                          //               Sales End Date*{" "}
                          //             </label>
                          //             <input
                          //               onChange={(e) =>
                          //                 setCreateTikcketEndDate(
                          //                   e.target.value
                          //                 )
                          //               }
                          //               value={CreateTikcketEndDate}
                          //               type="date"
                          //               name=""
                          //               id=""
                          //               className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                          //             />
                          //           </div>
                          //           <div>
                          //             <label
                          //               htmlFor="email"
                          //               className="mb-1 text-[12.5px] tracking-wide text-black-600"
                          //             >
                          //               {" "}
                          //               Sales End Time*{" "}
                          //             </label>
                          //             <input
                          //               onChange={(e) =>
                          //                 setCreateTikcketEndTime(
                          //                   e.target.value
                          //                 )
                          //               }
                          //               value={CreateTikcketEndTime}
                          //               type="time"
                          //               name=""
                          //               id=""
                          //               className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                          //             />
                          //           </div>
                          //         </div>
                          //       </div>

                          //       <div className="flex position: fixed; items-center gap-3 p-4 mt-5 border-t">
                          //         <button
                          //           className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          //           onClick={handleSubmit}
                          //           type="submit"
                          //         >
                          //           Update
                          //         </button>
                          //       </div>
                          //     </div>
                          //   </div> 
                          // </div>
                        )} 

                        {/* {allEventData.TicketData.Addmission.map(
                          (Ticket, index) => (
                            <div className="mt-8" key={index}>
                              <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                  <div>
                                    <div onClick={() => getIndex(index)}>
                                      <h3 className="text-sm text-gray-900   hover:text-blue-400  cursor-pointer">
                                        {Ticket.name}
                                      </h3>
                                    </div>

                                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                      <div>
                                        <dt className="inline">End Date:</dt>
                                        <dd className="inline">
                                          {Ticket.endDate}{" "}
                                        </dd>
                                      </div>

                                      <div>
                                        <dt className="inline">Time:</dt>
                                        <dd className="inline">
                                          {Ticket.endTime}
                                        </dd>
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
                                      <label
                                        htmlFor="Line1Qty"
                                        className="sr-only"
                                      >
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

                                    <button className="text-gray-600 transition hover:text-red-600">
                                      <span className="sr-only">
                                        Remove item
                                      </span>

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
                          )
                        )} */}
                      </>
                    )}

                    {showPromoCode && (
                      <>
                        <div class="flex justify-end items-center ">
                          {/* {createTicket && (
                            <CreateTicketQickView basicInfoId={basicInfoId} />
                          )} */}
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
          )}
        </div>
      )}
      {/* -------------------------------------------------------------------------------------- */}
      {showBookedUser && (
        <>
          <br></br>
          <div className="w-full sm:px-6">
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="h-16 w-full text-sm leading-none text-gray-800">
                    <th className="font-normal text-left pl-12">Ticket Name</th>
                    <th className="font-normal text-left pl-12">Quantity</th>
                    <th className="font-normal text-left pl-20">Total Price</th>
                  </tr>
                </thead>
                {bookedUserDetials != null && (
                  <>
                    <>
                      {bookedUserDetials.map((item, index) => (
                        <>
                          <tbody className="w-full" key={index}>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                              <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                  {item.eventTitle}
                                </p>
                              </td>
                              <td className="pl-12">
                                <p className="font-medium"> {item.Quantity}</p>
                                <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                              </td>
                              <td className="pl-20">
                                <p className="font-medium">{item.TotalPrice}</p>
                              </td> 
                            </tr>
                          </tbody>

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
                                {item.admissionDetails.map((item, index) => (
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
                                ))}
                              </table>
                              <hr />
                            </div>
                          </>
                          <hr />
                          <hr />
                        </>
                      ))}
                    </>
                  </>
                )}
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditEvent;
