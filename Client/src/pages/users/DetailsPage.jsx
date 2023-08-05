import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import DetailsPage from '../../component/User/Details/DetailsComponet'
import ProgressBar from '../../component/User/ProgressBar/ProgressBar';
import Nav from "../../component/User/Nav bar/NavBar";
import CryptoJS from "crypto-js";
import { decryptUserId } from "../../Helper/Helper";
import axiosInstance from "../../Helper/axiosInstance"



function Details() { 
  const { id } = useParams();
  const [hideCreateEvent,setHideCreateEvent] =  useState(false)
  
  
  const userId = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
   // dicrypt the userid
  
   const decryptedUserId = decryptUserId(userId, secretKey);
  
 
  console.log(id)
  return (
      <>
      <Nav userId={decryptedUserId} hideCreateEvent={hideCreateEvent} />
    <ProgressBar  currentStep={2}/>
    <DetailsPage basicInfo={id} />
    </>
  )
}

export default Details