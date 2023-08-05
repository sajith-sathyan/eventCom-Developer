import React, { useState } from "react";
import BasicinfoPage from "../../component/User/Basic info/BasicInfo";
import ProgressBar from "../../component/User/ProgressBar/ProgressBar";
import Nav from "../../component/User/Nav bar/NavBar";
import CryptoJS from "crypto-js";
import { decryptUserId } from "../../Helper/Helper";

import axiosInstance from "../../Helper/axiosInstance"

  
function Basicinfo() {
  const [hideCreateEvent, setHideCreateEvent] = useState(false);

    const userId = localStorage.getItem("userId");
    const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;

    const decryptedUserId = decryptUserId(userId, secretKey);
  return (
    <>
      <Nav userId={decryptedUserId} hideCreateEvent={hideCreateEvent} />
      <ProgressBar currentStep={1} />
      <BasicinfoPage />
    </>
  );
}

export default Basicinfo;
