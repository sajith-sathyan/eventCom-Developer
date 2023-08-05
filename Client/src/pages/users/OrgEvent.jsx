import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Sidebar from "../../component/User/Sidebar/Sidebar";
import OrgEventList from "../../component/User/OrgEventList/OrgEventList";
import {useUpdateDataOnRender} from '../../Helper/Helper'
import axiosInstance from "../../Helper/axiosInstance"
import axios from "axios";
function OrgEvent() {
  const [eventList,setEventList] = useState([])
  // side bar status
  const sidbarStatus = {
    event: true,
    home: false,
    statitics: false,
    underNavBar : false
  };
  // get the user id from local storage
  const userId = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
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

  

const [ showQrcode,setShowQrcode] = useState(false)

const handleClick = (showQrcode) =>{
  setShowQrcode(showQrcode)
}

useEffect(()=>{
  useUpdateDataOnRender("orgnzeEvent")
},[])
console.log("showQrcode----->",showQrcode)

  return (
    <>
      <Sidebar sidbarStatus={sidbarStatus} handleQrClick={handleClick} />
      <OrgEventList showQrcode={showQrcode}  handleQrClick={handleClick}  UserId={decryptedUserId}/>
    </>
  );
}

export default OrgEvent;
