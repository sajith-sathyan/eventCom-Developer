import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../Helper/axiosInstance"
const Banner = () => {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosInstance.get("/getBannerShow");
        setBanner(data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanner();
  }, []);
  return (
    <>
      <div
        className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill"
        style={{
          backgroundImage:
            `url(${banner})`,
        }}
      >
        <div className="md:w-1/2">
          <p className="font-bold text-sm uppercase">Services</p>
          <p className="text-3xl font-bold">Multimedia products</p>
          <p className="text-2xl mb-10 leading-none">
            Atractive designs for your brand
          </p>
          {/* <a
            href="#"
            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
          >
            Contact us
          </a> */}
        </div>
      </div>
    </>
  );
};

export default Banner;
