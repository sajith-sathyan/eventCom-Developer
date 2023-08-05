import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/User/Sidebar/Sidebar';
import Navbar2 from '../../component/User/Navbar2/Navbar2';
import  Graph  from '../../component/User/Graph/Graph';
import OrgDashboard from '../../component/User/OrgDashboard/OrgDashboard';
import {useUpdateDataOnRender} from '../../Helper/Helper'
import axiosInstance from "../../Helper/axiosInstance"

function OrganizationsHome() {
  const sidbarStatus = {
    event: false,
    home: true,
    statitics: false,
    statitics: false,
  };
  const [ showQrcode,setShowQrcode] = useState(false)

const handleClick = (showQrcode) =>{
  setShowQrcode(showQrcode)
}
useEffect(()=>{
  useUpdateDataOnRender("organizerHome")
},[])
console.log("showQrcode----->",showQrcode)

  return (
    <>
      <Sidebar sidbarStatus={sidbarStatus}  handleQrClick={handleClick} />
      <OrgDashboard showQrcode={showQrcode}  handleQrClick={handleClick}  /> 
÷
    </>
  );
}

export default OrganizationsHome;
