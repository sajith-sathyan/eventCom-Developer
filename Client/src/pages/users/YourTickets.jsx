import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../component/User/Nav bar/NavBar";
import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";
import YourTicket from "../../component/supperAdmin/YourTicket/YourTicket";
import {useUpdateDataOnRender} from '../../Helper/Helper'
import axiosInstance from "../../Helper/axiosInstance"
function YourTickets() {
  const [eventData, setEventData] = useState([]);
  const [user, setUser] = useState({});
  const [hideCreateEvent, setHideCreateEvent] = useState(true);

  // get user for redux
  const userRedux = useSelector((state) => state.user.value);
  console.log("userRedux--->", userRedux);

  // encript the user id for store the local storage
  const userId4Encript = userRedux.userId;
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  const encryptedUserId = CryptoJS.AES.encrypt(
    userId4Encript.toString(),
    secretKey
  ).toString();

  // add the user id in localstorage
  if (userRedux.userId.length != 0) {
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
        const response = await axiosInstance.get("/eventDetails");
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
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    fetchUser(decryptedUserId);
  
  }, []);

  return (
    <>
      <Nav userId={decryptedUserId} hideCreateEvent={hideCreateEvent} />
      {decryptedUserId != null && (<YourTicket  userId={decryptedUserId} />)}
      
    </>
  );
}

export default YourTickets;
