import React, { useEffect, useState } from "react";
import Nav from "../../component/User/Nav bar/NavBar";
import Banner from "../../component/User/Banner/Banner";
import EventCard from "../../component/User/EventCard/EvevtCard";
import axios from "axios";
  import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";
import { useUpdateDataOnRender } from "../../Helper/Helper";


function Home1() {
  const [allEvnet, setAllEvent] = useState([]);
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

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  console.log("decryptedUserId---->", decryptedUserId);
  console.log("decryptedUserId---|||--------->", eventData);
  useEffect(() => {
    // get all events
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/eventDetails");
        console.log("response.data------>", response.data);
       
        setAllEvent(response.data);
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
   if(decryptedUserId != null){
    fetchUser(decryptedUserId);
   }
    useUpdateDataOnRender("home");
  }, []);
  
  return (
    <div>
      <Nav userId={decryptedUserId} hideCreateEvent={hideCreateEvent} />
      <Banner />
      <EventCard eventData={eventData} />
    </div>
  );
}

export default Home1;
