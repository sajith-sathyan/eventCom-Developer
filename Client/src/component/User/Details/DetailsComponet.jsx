import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEventId } from "../../../features/CreateEvent";
import axiosInstance from "../../../Helper/axiosInstance";
// firebase config import
import { storage } from "../../../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Details(props) {
  const { basicInfo } = props;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [Image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [showFile, setShowFile] = useState(true);
  const [imgageValidation, setImageValidation] = useState(false);

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const { id } = useParams();
  console.log(id);
  dispatch(
    createEventId({
      BasicInfoId: id,
      EventMediaId: "",
      TicketId: "",
    })
  );

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  // image file onchange
  const handleImgeSubmitt = (e) => {
    setImageValidation(false);
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = selectedFile.name
        .split(".")
        .pop()
        .toLowerCase();

      // Validate file extension
      if (allowedExtensions.includes(fileExtension)) {
        setImage(selectedFile);
        setShowFile(false);
      } else {
        setImageValidation(true);
        console.log(
          "Invalid file format. Only JPEG, JPG, and PNG files are allowed."
        );
      }
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  console.log("url----------->", url);
  // submitting data to server
  const [error, setError] = useState("");
  const [handleSubmitErorr, setHandleSubmitError] = useState(false);
  const handleSubmitt = async (e) => {
    e.preventDefault();

    const errors = validateFields(summary, text, url);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    try {
      const { data } = await axiosInstance
        .post(
          "/event/details",
          { EventStatus: "Pending", id, url, summary, text, imgageValidation },
          { withCredentials: true }
        )
        .catch((err) => {
          const errorMessage = err.response.data.msg.message;

          // Iterate over the entries and log the key and value
          const regex = /(\w+):\s(\w+\s?\w+)/g;
          let match;
          const keyValuePairs = {};

          while ((match = regex.exec(errorMessage)) !== null) {
            const key = match[1];
            const value = match[2];
            keyValuePairs[key] = value;
            const error = key + " are not filled";
            toast.error(error, {
              position: "bottom-right",
            });
          }
          console.log("", err.response.data.msg.message);
        });

      if (data) {
        console.log("data------>", data);
        dispatch(
          createEventId({
            BasicInfoId: data.savedEventMedia.basicInfoId,
            EventMediaId: "",
            TicketId: "",
          })
        );
        navigate(
          `/organizations/event/${data.savedEventMedia._id}/createTicket`
        );
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err, "handle submittion error");
    }
  };
  console.log("error------>", error);

  // summary validation
  const validateFields = (summary, description, url, imgageValidation) => {
    let errors = {};
    if (summary.length < 2) {
      errors.summary = "Please fill the summary field.";
    }
    if (text.length < 2) {
      errors.text = "Please fill the description field.";
    }
    if (url.length < 2) {
      errors.url = "Please fill the Image field.";
    }

    return errors;
  };

  return (
    <>
      <div>
        <main className="flex items-center justify-center flex-1 px-4 py-8">
          {/* <h1 className="text-5xl font-bold text-gray-500">In progress</h1> */}
          {/* Content */}
          {/* component */}

          <div className="container max-w-screen-lg mx-auto sm:w-full">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                  Event media
                </div>
                <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  <br />
                  Add photos to show what your event will be about. You can
                  upload up to 10 images.
                </span>
                <br />
                <br />
                <div className="border border-dashed border-gray-500 relative">
                  {showFile && (
                    <div>
                      <input
                        onChange={handleImgeSubmitt}
                        type="file"
                        multiple=""
                        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50 "
                        required
                      />
                      <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto ">
                        <h4>
                          Drop files anywhere to upload
                          <br />
                          or
                        </h4>
                        <p className="">Select Files</p>
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    {url && (
                      <>
                        <img
                          className="object-cover w-full h-56 sm:h-96"
                          src={url}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
                      </>
                    )}
                  </div>
                </div>
                {error.url && (
                  <p className="text-red-500 text-sm">{error.url}</p>
                )}
                {imgageValidation && (
                  <p className="text-red-500 text-sm">
                    "Invalid file format. Only JPEG, JPG, and PNG files are
                    allowed."
                  </p>
                )}
                <br />
                <br />
                <br />
                <div
                  onClick={handleImageSubmit}
                  className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                  href="/download"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                      className="h-5 w-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Add
                  </span>
                </div>
                <br />
                <br />
                <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                  Summary
                </div>
                <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  <br />
                  Grab people's attention with a short description about your
                  event. Attendees will see this at the top of your event page.
                  (140 characters max)
                </span>
                <>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    defaultValue={""}
                    name="summary"
                    onChange={(e) => setSummary(e.target.value)}
                    required
                  />
                </>
                {error.summary && (
                  <p className="text-red-500 text-sm">{error.summary}</p>
                )}
                {/* <div className="flex flex-wrap justify-center">
                  <div className="w-full md:w-1/3 p-4">
                    <div className="bg-gray-200 h-10 md:h-15" />
                  </div>
                  <div className="w-full md:w-1/3 p-4">
                    <div className="bg-gray-200 h-10 md:h-15" />
                  </div>
                  <div className="w-full md:w-1/3 p-4">
                    <div className="bg-gray-200 h-10 md:h-15" />
                  </div>
                </div> */}
                <br />
                <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                  Description
                </div>
                <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  <br />
                  Add more details to your event like your schedule, sponsors,
                  or featured guests
                </span>
                <br /> <br />
                <div className="h-128">
                  <div className="mb-1 text-xs sm:text-sm tracking-wide ">
                    <ReactQuill
                      className="editor-input"
                      theme="snow"
                      value={text}
                      onChange={setText}
                      modules={modules}
                      required
                    />
                  </div>
                </div>
                {error.text && (
                  <p className="text-red-500 text-sm">{error.text}</p>
                )}
                {/* <h1>content</h1>
                <div dangerouslySetInnerHTML={{__html: text}}></div> */}
                <br />
                <br />
                {handleSubmitErorr && (
                  <div class="text-center">
                    <p class="text-red-500  ">
                      "You cannot submit this form because you have not filled
                      in all the required fields."
                    </p>
                  </div>
                )}
                <br />
                <br />
                <br />
                <div className="flex flex-col px-10 mb-6 justify-items-end">
                  <button
                    type="button"
                    className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 justify-self-end self-end"
                    onClick={handleSubmitt}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default Details;
