import CryptoJS from "crypto-js";
import { loggedUser } from "../features/user";
import axios from "axios";
import axiosInstance from '../Helper/axiosInstance'

export function decryptUserId(userId, secretKey) {
  if (userId) {
    const decryptedKey = CryptoJS.AES.decrypt(
      userId || "no-user-id",
      secretKey
    );
    return decryptedKey.toString(CryptoJS.enc.Utf8);
  }
  return null;
}

export async function fetchUserDetails(userId, dispatch) {
   const accessToken =  localStorage.getItem("accessToken")
  try {
    if(accessToken){
      const response = await axiosInstance.get(
        `/userDetails?id=${userId}`
      );
      const userData = response.data;
      console.log("=====nav response==>", userData);
  
      if (userData) {
        dispatch(
          loggedUser({
            userId: userData[0]._id,
            username: userData[0].username,
            mobile: userData[0].mobile,
            email: userData[0].email,
            status: userData[0].Status,
          })
        );
      }
      return userData;
    }else{
      dispatch(
        loggedUser({
          userId: '',
          username: '',
          mobile:"",
          email: "",
          status:"",
        })
      );
      return null
    }

    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axiosInstance.post("/refresh-token", { refreshToken });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}

 
export async function useUpdateDataOnRender (pageName) {

    const updateData = async () => {
      try {
      const {data} =    await axiosInstance.post("/useUpdateDataOnRender",{pageName:pageName},{withCredentials:true}); // Make the API call to update data
        // Additional logic or state updates after the API call can be added here
      } catch (error) {
        console.error('Failed to update data:', error);
      } 
    };

    updateData();
 
};