import React, { useEffect, useState } from "react";
import CheckOutComponent from "../../component/User/CheckOut/CheckOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decryptUserId } from "../../Helper/Helper";
import axiosInstance from "../../Helper/axiosInstance" 
function CheckOut() {
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
      }, []);
    console.log("alldata -- > ", allData);
  if(allData!=null){
    
    var {BasicInfoData,EvetnMeidaData,TicketData} = allData
  }
  return (
    <div>
      <CheckOutComponent allData={allData}/>
    </div>
  );
}

export default CheckOut;
