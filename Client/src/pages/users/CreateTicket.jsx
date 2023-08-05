import React, { useEffect, useState } from "react";
import CreateSidebar from "../../component/User/CreateSidebar/CreateSidebar";
import Ticket from "../../component/User/Tickets/Tickets";
import TicketShowAndManage from "../../component/User/TicketShowAndManage/TicketShowAndManage";
import ProgressBar from "../../component/User/ProgressBar/ProgressBar";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "../../component/User/Nav bar/NavBar";
import CryptoJS from "crypto-js";
import { decryptUserId } from "../../Helper/Helper";
import axiosInstance from "../../Helper/axiosInstance"  

function CreateTickets() {
  const [TicketData, setTicketData] = useState(null);
  const [BasicInfo,setBasicInfo]= useState(null)

  const { id } = useParams();

  const [hideCreateEvent, setHideCreateEvent] = useState(false);

  const userId = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  // dicrypt the userid

  const decryptedUserId = decryptUserId(userId, secretKey);

  console.log("-------------id----------", id);
  useEffect(() => {
    // fetch data from ticket datdabase
    const fetchData = async (EventMediaId) => {
      try {
        console.log("called");
        const TicketData = await axiosInstance.get(
          `/getTicketDetialsById?id=${EventMediaId}`
        );
        console.log("create ticket page", TicketData.data);
        if (TicketData) {
          setTicketData(TicketData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchBasicInfo = async (EventMediaId) => {
      try {
        const { data } = await axiosInstance.get(
          `/getBasicInfoByEventMediaId?id=${EventMediaId}`
        );
        console.log("data--->?////", data)
        setBasicInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBasicInfo(id);
    fetchData(id);
  }, []);

  return (
    <>
      <Nav userId={decryptedUserId} hideCreateEvent={hideCreateEvent} />
      <ProgressBar currentStep={3} />
      <TicketShowAndManage basicInfoId={id} TicketData={TicketData} BasicInfo={BasicInfo} />
    </>
  );
}

export default CreateTickets;
