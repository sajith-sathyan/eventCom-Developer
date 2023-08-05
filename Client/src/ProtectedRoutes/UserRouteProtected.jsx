import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedUser } from "../features/user";
import axios from "axios";
import CryptoJS from "crypto-js";
import axiosInstance from "../Helper/axiosInstance";
function UserRouteProtected() {
  const [isLoading, setLoading] = useState(false);
  const userRedux = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const secretKey = process.env.REACT_APP_CRIPTO_JS_SECRET_ID;
  const userId = localStorage.getItem("userId");

  const decryptedUserId = userId
    ? CryptoJS.AES.decrypt(userId, secretKey).toString(CryptoJS.enc.Utf8)
    : null;

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/userDetails?id=${userId}`);
      const userData = response.data;
      console.log("response------>", userData);

      if (userData[0].Status === "active") {
        setLoading(true);
      } else {
        navigate("/");
      }
      if (userData.accessToken != null) {
        setLoading(true);
      } else {
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (decryptedUserId) {
      fetchUserDetails(decryptedUserId);
    } else {
      navigate("/");
    }
  }, [decryptedUserId, navigate]);

  if (isLoading) {
    return <Outlet />;
  } else {
    return null; // or any fallback UI for unauthorized access
  }
}

export default UserRouteProtected;
