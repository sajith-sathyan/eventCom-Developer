import React, { useEffect, useState } from "react";
import Sidebar from "../../component/User/Sidebar/Sidebar";
import EditEventComponent from "../../component/User/EditEvent/EditEvent";
import { useParams } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

import { useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance"
function EditEvent() {
  const [allEventData, setAllEventData] = useState(null);
  const [showQrcode, setShowQrcode] = useState(false);
  // side bar status
  const sidbarStatus = {
    event: true,
    home: false,
    statitics: false,
    underNavBar: false,
  };

  const { id } = useParams();
  console.log("........", id);

  

  // get event data by basic info id
  useEffect(() => {
    // get all the event detials form 3 database
    const fetchData = async (id) => {
      try {
        const responce = await axiosInstance.get(
          `/GetAllEventDetialsByBasicInfoID?id=${id}`
        );
        console.log("responce------.........---------->",responce);
        setAllEventData(responce.data);
        console.log("allEventData ------ allEventData--->", allEventData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(id);
  }, []);

  useEffect(() => {}, []);

  const handleClick = (showQrcode) => {
    setShowQrcode(showQrcode);
  };

  console.log("showQrcode----->", showQrcode);
  if (allEventData != null) {
    var allEventDatas = allEventData;
  }
  return (
    <>
      <Sidebar
        sidbarStatus={sidbarStatus}
       
        handleQrClick={handleClick}
      />
      {allEventData !== null && (
        <EditEventComponent
          allEventData={allEventData}
          handleQrClick={handleClick}
        />
      )}
    </>
  );
}

export default EditEvent;
