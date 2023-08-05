import React, { useEffect, useState } from "react";
import Sidebar from "../../component/User/Sidebar/Sidebar";
import Ticket from "../../component/User/Tickets/Tickets";
import Qickview from "../../component/User/Qickview/Qickview";
import { useParams } from "react-router";
import axios from "axios";
import {useUpdateDataOnRender} from '../../Helper/Helper'
import axiosInstance from "../../Helper/axiosInstance"

function Tickets() {
    const [TicketData,setTicketData] = useState(null)
  const sidbarStatus = {
    event: true,
    home: false,
    statitics: false,
    underNavBar: true,
    eventPage: true,
  };
  const eventPage = {
    basicInfo: { status: false, id: 23456789 },
    eventMedia: { status: false, id: 213144 },
    ticket: { status: true, id: 213144 },
    publish: { status: false, id: 213144 },
  };

  const { id } = useParams();
  console.log("id---------->",id)
  useEffect(() => {
    try {
      const fetchTicket =async (basicInfoId) => {
        try {
          const TicketData = await axiosInstance.get(
            `/getTicketDataById?id=${basicInfoId}`
          );
          
          setTicketData(TicketData.data)
        } catch (err) {
          console.log(err);
        }
      };
      
      
      fetchTicket(id);
    } catch (err) {
      console.log(err, "fetchTicket-->ERROR");
    }
    useUpdateDataOnRender("Ticket")
  }, []);
 

  if(TicketData!=null){
    var EventMediaId = TicketData.EventMediaId
  }else{
    var EventMediaId = null
  }
  

  console.log(id);
  return (
    <>
      <Sidebar
        sidbarStatus={sidbarStatus}
        eventPage={eventPage}
        basicInfoId={id}
        eventMediaId={EventMediaId}
      />
      <Ticket basicInfoId={id}  EventMediaId={EventMediaId} />
    </>
  );
}

export default Tickets;
