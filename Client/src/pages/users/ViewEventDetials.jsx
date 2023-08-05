import React, { useEffect, useState } from "react";
import ViewEvent from "../../component/User/ViewEvent/ViewEvent";
import Navbar2 from "../../component/User/Nav bar/NavBar";
import { useParams } from "react-router";
import CryptoJS from "crypto-js";
import axios from "axios";
import { decryptUserId } from "../../Helper/Helper";
import {useUpdateDataOnRender} from '../../Helper/Helper'
import axiosInstance from "../../Helper/axiosInstance"

export default function ViewEventPage() {
  const [allData, setAllData] = useState(null);
  const { Id } = useParams();
  console.log(Id);

  const userId = localStorage.getItem("userId");
  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  // dicrypt the userid
  const decryptedUserId = decryptUserId(userId, secretKey);
  useEffect(() => {
    try {
      const fetchEventdetials = async () => {
        try {
          // get all data use event media id
          const EventData = await axiosInstance.get(
            `/GetAllEventDetialsByBasicInfoID?id=${Id}`
          );
          console.log("EventData-00-->", EventData.data);
          setAllData(EventData.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchEventdetials(Id);
    } catch (err) {
      console.log(err);
    }
    useUpdateDataOnRender("viewEventPage")
  }, []);
  console.log("alldata -- > ", allData);
  return (
    <>
      <Navbar2 userId={decryptedUserId} />
      {allData != null && (<ViewEvent allData={allData} />)}
      
    </>
  );
}
