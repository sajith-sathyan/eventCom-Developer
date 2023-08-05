import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/supperAdmin/AdminSideBar/AdminSidebar";
import ListUser from "../../component/supperAdmin/AdminUserList/AdminUserlist";
import LineChart from "../../component/supperAdmin/Graph/graph";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});
function Index() {
  const [user, setUSer] = useState([]);
  const [allData, setAllData] = useState(null);
  const [Home, setHome] = useState(null);
  const [eventTicket,setEventTicket] = useState(null);
  const [organizerHome,setOrganizerHome] =useState(null)
  const [orgnzeEvent,setOrgnzeEvent] = useState(null)
  const [viewEventPage,setViewEventPage] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/admin/getUser");
        console.log(response.data);
        setUSer(response.data);
      } catch (err) {
        console.log(err);
      }
    }
   
    fetchData();
  }, []);
   

  useEffect(() => {
    async function getGraaphDetials() {
      try {
        const { data } = await axiosInstance.get("/admin/getVistedCount");
        console.log("getGraaphDetials------------------------->", data.responce);
        setAllData(data.responce);
      } catch (err) {
        console.log(err);
      }
    }
    getGraaphDetials();
  }, []);
  
  useEffect(() => {
    if (allData != null) {
        for (var i = 0; i < allData.length; i++) {
         
          if (allData[i].page === "home") {
            console.log("allData[i].page------->", allData[i].count);
            setHome(allData[i].count)
          }else if(allData[i].page === "EventTicket"){
            setEventTicket(allData[i].count)
          }else if(allData[i].page === "organizerHome"){
            setOrganizerHome(allData[i].count)
          }else if(allData[i].page === "orgnzeEvent"){
            setOrgnzeEvent(allData[i].count)
          }else if(allData[i].page === "viewEventPage"){
            setViewEventPage(allData[i].count)
          }
          
        }
      }
  }, [allData]);


  return (
    <div className="flex">
      <AdminSidebar />

      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
   {Home !=null && ( <LineChart Home={Home} EventTicket={eventTicket}  organizerHome={organizerHome} orgnzeEvent={orgnzeEvent} viewEventPage={viewEventPage}/>)}
      </div>
    </div>
  );
}

export default Index;
