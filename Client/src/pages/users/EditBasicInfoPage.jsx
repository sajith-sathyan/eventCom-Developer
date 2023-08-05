import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../component/User/Sidebar/Sidebar";
import EditBasicInfo from "../../component/User/EditBasicInfo/EditBasicInfo";
import axios from "axios";
import axiosInstance from "../../Helper/axiosInstance"
function EditBasicInfoPage() {
 const [basicInfoData,setBasicInfoData] = useState(null)
  // sidebar status
  const [basicInfoId, setBasicInfoId] = useState(null);
  const sidbarStatus = {
    event: true,
    home: false,
    statitics: false,
    underNavBar: true,
    eventPage: true,
  };
  const eventPage = {
    basicInfo: { status: true },
    eventMedia: { status: false },
    ticket: { status: false },
    publish: { status: false },
  };
  const { id } = useParams();
  console.log("basicinfo id==>", id);

  useEffect(() => {
    try {
      // featch data from basic info database use event media id
      const feachBasicInfoById = async(BasicInfoId) => {
        try {
          const BasicInfo = await axiosInstance.get(
            `/GetBasicInfoByID?id=${BasicInfoId}`
          );
          console.log("BasicInfo-->",BasicInfo.data)
          setBasicInfoData(BasicInfo.data)
        } catch (err) {
          console.log(err, "feachBasicInfoById err");
        }
      };
      feachBasicInfoById(id)
    } catch (err) {
      console.log(err);
    }
  }, []);
  if(basicInfoData!=null){
    var eventMediaId = basicInfoData.EventMediaId
  }
  return (
    <>
      <Sidebar sidbarStatus={sidbarStatus} eventPage={eventPage} eventMediaId={eventMediaId} />
      <EditBasicInfo  basicInfoData={basicInfoData} />
    </>
  );
}

export default EditBasicInfoPage;
