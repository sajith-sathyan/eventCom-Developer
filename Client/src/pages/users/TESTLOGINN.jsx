// Login.js (React component)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    console.log("called----->handleLogin");
    const email = "fsdfsdf";
    const password = "rr3r3ef";
    try {
      const response = await axios.post("http://localhost:4000/TESTloginn", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      console.log("accessToken----->", accessToken);
      console.log("refreshToken----->", refreshToken);
      // Store tokens securely (e.g., in local storage or cookie)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Make subsequent API requests with the access token in headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Redirect to the authenticated user's dashboard
      // You can implement the redirection logic here
      navigate("/TESTHOME");
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };
  const handlelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("log out work");
  };

  return (
    <div>
      <button onClick={handleLogin} type="submit">
        Login
      </button>
      <br />
      <button onClick={handlelogout}>log Out</button>
    </div>
  );
};

export default Login;
