import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/supperAdmin/AdminSideBar/AdminSidebar";
import AddCategoryAndTypeButton from "../../component/supperAdmin/AddCategoryAndTypeButton/AddCategoryAndTypeButton";
import CategoryAndTypeList from "../../component/supperAdmin/CategoryAndTypeList/CategoryAndTypeList";
import axios from "axios";
function CategoryAndType() {
  const [categoryAndType,setCategoryAndType] = useState(null)
  const[categoryIndex,setCategoryIndex]=useState(null)
  const[typeIndex,setTypeIndex]=useState(null)

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });


  useEffect(()=>{
    async function  fetchData(){
      try{
      const response = await axiosInstance.get("/admin/getCategoryAndType")
      console.log(response.data.CategoryAndType[0])
      setCategoryAndType(response.data.CategoryAndType[0])
      
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])
  const getindexOfCategory=(index)=>{
  console.log("index------>",index)
  setCategoryIndex(index)
  setTypeIndex(null)
  }
  const getindexOfType=(index)=>{
    console.log("getindexOfType------>",index)
    setTypeIndex(index)
    setCategoryIndex(null)
  }
  return (
 
    <div className="flex flex-no-wrap">
    <AdminSidebar />

    <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
      
    <AddCategoryAndTypeButton categoryAndType={categoryAndType} categoryIndex={categoryIndex} typeIndex={typeIndex}/>
   
    { (<CategoryAndTypeList CategoryAndType={categoryAndType} getindexOfCategory={getindexOfCategory} getindexOfType={getindexOfType} />)}
    </div>
  </div>
  );
}

export default CategoryAndType;
