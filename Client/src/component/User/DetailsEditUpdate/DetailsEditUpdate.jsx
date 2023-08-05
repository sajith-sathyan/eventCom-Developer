import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../../Helper/axiosInstance"

function DetailsEditUpdate(props) {
  const [text, setText] = useState("");
  const [eventData, setEventData] = useState("");

  const { EventMedia } = props;
  // console.log("-->",props.EventMedia.summary)

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

  return (
    <div className=" ">
      <main className="flex items-center justify-center  px-4 py-8">
        {/* <h1 className="text-5xl font-bold text-gray-500">In progress</h1> */}
        {/* Content */}
        {/* component */}

        <div className="container max-w-screen-lg  mx-auto sm:w-full">
          <div >
            <div className="bg-white rounded shadow-lg px-4 md:p-8 mb-6">
              <div className="font-bold self-start text-xl sm:text-2xl uppercase text-gray-800">
                Event media
              </div>
              <span className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                <br />
                Add photos to show what your event will be about. You can upload
                up to 10 images.
              </span>
              <br />
              <br />
              <div className="border border-dashed border-gray-500 relative">
                <input
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
              
              <button>send</button>
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
                  value="jkdjksdfknnkdkndsfknknfdjk"
                  required
                />
              </>
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
                Add more details to your event like your schedule, sponsors, or
                featured guests
              </span>
              <br /> <br />
              <div className="h-128">
                <div className="mb-1 text-xs sm:text-sm tracking-wide ">
                  <ReactQuill
                    className="editor-input"
                    theme="snow"
                    onChange={setText}
                    modules={modules}
                    required
                  />
                </div>
              </div>
              {/* <h1>content</h1>
                <div dangerouslySetInnerHTML={{__html: text}}></div> */}
              <br />
              <br />
              <div class="text-center">
                <p class="text-red-500  ">
                  "You cannot submit this form because you have not filled in
                  all the required fields."
                </p>
              </div>
              <br />
              <br />
              <br />
              <div className="flex flex-col px-10 mb-6 justify-items-end">
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 justify-self-end self-end"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailsEditUpdate;
