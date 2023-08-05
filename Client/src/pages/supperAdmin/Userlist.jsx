import React, { useEffect, useState } from 'react'
import AdminSidebar from "../../component/supperAdmin/AdminSideBar/AdminSidebar";
import ListUser from "../../component/supperAdmin/AdminUserList/AdminUserlist";
import axios from 'axios'
import {useSelector} from 'react-redux'

function UserList() {
  const Headding = "User List"
  const [user,setUSer] = useState([])
 
  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  useEffect(()=>{
    async function  fetchData(){
      try{
      const response = await axiosInstance.get("/admin/getUser")
      console.log(response.data)
      setUSer(response.data)  
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])
  

const SidBarStatus = {
  Dashboard:false,
  usemangement:true,
  EventMnagemet:false,
  category:false,
  Banner:false
}  
  return (
    <div className="flex flex-no-wrap">
      <AdminSidebar />
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <ListUser users={user} />
      </div>
    </div>
  )
}

export default UserList