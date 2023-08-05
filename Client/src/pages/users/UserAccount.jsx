import React, { useEffect, useState } from 'react'
import Nav from "../../component/User/Nav bar/NavBar";
import UserAccountComponet from '../../component/User/UserAccount/UserAccount';
import { useParams } from 'react-router';
import CryptoJS from "crypto-js";
import { decryptUserId } from "../../Helper/Helper";
import axiosInstance from "../../Helper/axiosInstance"

import axios from 'axios';

function UserAccount() {
    const [UserDetials, setUserDetials] = useState(null)
    const {Id} = useParams()
    console.log("........",Id)
     // get the user id from local storage
     const userId = localStorage.getItem("userId");
     const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
 
     const decryptedUserId = decryptUserId(userId, secretKey);

  console.log("decryptedUserId----->",decryptedUserId)
    useEffect(()=>{
        try{
            const fetchUserData = async (Id) =>{
                try{
                const UserData = await axiosInstance.get(`/getUserDataById?id=${Id}`)
                console.log(UserData.data)
                setUserDetials(UserData.data)
                }catch(err){
                    console.log(err,"fetchUserData---ERROR")
                }
            }
            fetchUserData(decryptedUserId)
        }catch(err){
            console.log(err)
        }
    },[])

    console.log("UserDetials---->",UserDetials)
    if(UserDetials!=null){
        var user =UserDetials
    }
  return (
    <div>
      <Nav userId={decryptedUserId} />
      <UserAccountComponet user={user} />
    </div>
  )
}

export default UserAccount