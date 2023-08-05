import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useNavigate,  } from "react-router-dom";

function AdminProtectedRoute({ component: Component, ...rest }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const Navigate = useNavigate()

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  useEffect(() => {
    const checkToken = async () => {
      try {
        const {data} = await axiosInstance.get(
          "/admin/getAdminData",
          { withCredentials: true }
        );
        const adminData = data.adminData[0];
      
        if (adminData) {
          const token = adminData.Token;
          
          if (token) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            Navigate("/admin/login"); // Redirect to login page if not admin
          }
        } else {
          setIsAdmin(false);
          Navigate("/admin/login"); // Redirect to login page if not admin
        }
      } catch (error) {
        console.error("Error checking/validating token:", error);
        setIsAdmin(false);
        Navigate("/admin/login"); // Redirect to login p    age if error
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [Navigate  ]);

  if (isLoading) {
    // Render a loading indicator or fallback component while checking the token
    return <h1>Loading...</h1>;
  }
  console.log("isAdmin--------->",isAdmin)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <h1>Protected</h1>
        )
      }
    />
  );
}

export default AdminProtectedRoute;
