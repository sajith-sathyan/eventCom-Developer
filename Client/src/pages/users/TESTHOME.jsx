// ProtectedComponent.js (React component)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from "../../Helper/axiosInstance"

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {


        // Make the protected API request
        const response = await axiosInstance.get('/protected');

        // Update the component state with the received data
        setData(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedComponent;
