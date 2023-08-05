import React from "react";
import axios from "axios";

function testLogin() {
  const handleLogin = async (_id,email, password) => {
    console.log("first--->",email,password)
    try {
      const responce = await  axios.post("http://localhost:4000/testLogin", {_id, email, password });

      if (responce.status === 200) {
        const { accessToken, refreshToken } = responce.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const access = localStorage.getItem("accessToken")
        const refresh = localStorage.getItem("refreshToken")
        console.log("accessToken--->",access)
        console.log("refresh--->",refresh)
        

      } else {
        console.log("token error");
        alert("token get error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProtectedData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // Handle and display the protected data
        console.log(" Handle and display the protected data")
      } else if (response.status === 401) {
        // Handle unauthorized access error
        // Example: redirect to login page or display an error message
        console.log("Handle unauthorized access error")
      } else {
        // Handle other response errors
        // Example: display an error message
      }
    } catch (error) {
      
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleLogin(1,"triangle4business@gmail.com", "123")}>
          Login
        </button>
        <br />
        <button onClick={handleProtectedData}>Get Protected Data</button>
      </div>
    </div>
  );
}

export default testLogin;
