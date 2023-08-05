import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import axios from "axios";

function Banner() {
  const [showFile, setShowFile] = useState(true);
  const [Image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [banner, setBanner] = useState(null);
  const [selectBanner, setSelectBanner] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState(null);
const [render ,setRender ]= useState(true)

  // image file onchange
  const handleImgeSubmitt = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowFile(false);
    }
  };



  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
useEffect(()=>{
  fetchBanner()
},[deleteUrlFromDataBase,url])
  const handleImageSubmit = (e) => {
    try {
      const imageRef = ref(storage, Image.name);
      uploadBytes(imageRef, Image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              console.log("url ------ >> ", url);

              setUrl(url);
              setShowFile(false);
              fetchBanner ()
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBanner = async () => {
     
    try {
      const { data } = await axiosInstance.get("/admin/getBanner");
      console.log("---------", data);
      if (data && data.BannerUrl) {
        if(render){
          setBanner(data);
          setRender(false)
        }
       
      } else {
        setBanner(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUrlFromDataBase = async (url) => {
    try {
      const { data } = await axiosInstance.post(
        "/admin/DeleteBannerUrl",
        { url },
        { withCredentials: true }
      );
      setRender(true)
      if(data){
        fetchBanner();
      }
     
    } catch (err) {
      console.log(err);
    }
  };
 // Rerender when the state variable changes

  useEffect(() => {
    
    const addImage = async (url) => {
      try {
        const { data } = await axiosInstance.post(
          "/admin/addBanner",
          { url },
          { withCredentials: true }
        );
        console.log("Image added successfully");
        setRender(true)
        fetchBanner();
        
      } catch (err) {
        console.log(err);
      }
    };

    const chooseBanner = async (url) => {
      try {
        const { data } = await axiosInstance.post(
          "/admin/selectBanner",
          { url },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    };

    
    deleteUrlFromDataBase(url)
    fetchBanner()
    if (selectBanner != null) {
      chooseBanner(selectBanner);
    }
    if (url) {
      addImage(url);
    }
    if (deleteUrl != null) {
      deleteUrlFromDataBase(deleteUrl);
    }
  }, [url, selectBanner, deleteUrl,banner]); // Rerender when any of these state variables change

  const handleShowBanner = (url) => {
    console.log("handleShowBanner--->", url);
    setSelectBanner(url);
  };

  const deleteImageUrl = (url) => {
    setDeleteUrl(url);
  };
  const renderPage = () =>{
    window.location.reload()
  }

  console.log("banner--->", banner);
  return (
    <div>
      <div className="2xl:mx-auto 2xl:container 2xl:px-20 xl:px-12 sm:px-6 px-4 py-16">
        <h1 onClick={renderPage} className="lg:text-4xl text-3xl font-semibold leading-9 text-gray-800">
          Banner
        </h1>
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleImgeSubmitt} />
        <div
          onClick={handleImageSubmit}
          className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
          href="/download"
        >
          Add
        </div>
        <div className="md:flex items-start justify-between mt-12">
          <div className="md:w-1/2 lg:w-full">
            {banner != null ? (
              <>
                {banner.BannerUrl.map((item, index) => (
                  <div key={index}>
                    <br />
                    <div className="relative">
                      <img src={item} alt="stairs" />
                      <div className="bg-white absolute top-0 left-0"></div>
                    </div>
                    <br /> <br />
                    <div className="flex space-x-4">
                      <div
                        onClick={() => deleteImageUrl(item)}
                        className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                        href="/download"
                      >
                        Delete
                      </div>

                      <div
                        onClick={() => handleShowBanner(item)}
                        className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                        href="/download"
                      >
                        Show
                      </div>
                      <br />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
