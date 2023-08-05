import React, { useEffect, useState } from "react";
import Sidebar from "../../component/User/Sidebar/Sidebar";
import DetailsEditUpdate from "../../component/User/DetailsEditUpdate/DetailsEditUpdate";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance"
function EventEdit() {
  const [eventData, setEventData] = useState(null);
  const sidbarStatus = {
    event: true,
    home: false,
    statitics: false,
    underNavBar: true,
    eventPage: true,
  };
  const eventPage = {
    basicInfo: { status: false, id: 23456789},
    eventMedia:{ status: true, id: 213144 },
    ticket: { status: false, id: 213144 },
    publish: { status: false, id: 213144 },
  };

  const { id } = useParams();
  console.log(id);


  // featch data from eventmedia
  useEffect(() => {
    try {
      const featchEventMedia = async (eventMediaId) => {
        try {
          const eventMedia = await axiosInstance.get(
            `/getEventMediaById?id=${eventMediaId}`
          );
          //  console.log()
          setEventData(eventMedia.data);
        } catch (err) {
          console.log(err); 
        }
      };
      featchEventMedia(id);
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log("oooooo==>", eventData );
  if(eventData!=null){
    var basicInfoId = eventData.basicInfoId
  }
  return (
    <>
      <Sidebar sidbarStatus={sidbarStatus} eventPage={eventPage} basicInfoId={basicInfoId} />
      {/* <Sidebar sidbarStatus={sidbarStatus} /> */}
      <DetailsEditUpdate EventMedia={eventData} />
    </>
  );
}

export default EventEdit;
