import React, { useEffect, useState } from "react";
import ApproveEventList from "../../component/supperAdmin/ApproveEventList/ApproveEventList";
import AdminSidebar from "../../component/supperAdmin/AdminSideBar/AdminSidebar";

import { useSelector } from "react-redux";
import axios from "axios";
import CryptoJS from "crypto-js";

function ApproveEvent() {
  const [eventData, setEventData] = useState([]);
  const [user, setUser] = useState({});
  
  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  // get user for redux
  const userRedux = useSelector((state) => state.user.value);

  // encript the user id for store the local storage
  const userId4Encript = userRedux.userId;
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  const encryptedUserId = CryptoJS.AES.encrypt(
    userId4Encript,
    secretKey
  ).toString();

  // add the user id in localstorage
  if (userRedux.userId && userRedux.userId.length > 0) {
    localStorage.setItem("userId", encryptedUserId);
  }

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

  console.log("decryptedUserId---->", decryptedUserId);
  useEffect(() => {
    // get all events
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          "/admin/eventDetails"
        );
        // console.log(response.data)
        setEventData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    // get the logined user
    async function fetchUser(user) {
      try {
        const responce = await axiosInstance.get(
          `/userDetails?id=${user}`
        );
        console.log("=====responce==>", responce.data);
        setUser(responce.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    fetchUser(decryptedUserId);
  }, []);

  console.log("eventData------>", eventData);
  return (
    <div className="flex flex-no-wrap">
      <AdminSidebar />

      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        {eventData != null && <ApproveEventList eventData={eventData}  user ={user}/>}
      </div>
    </div>
  );
}

export default ApproveEvent;
