import axios from "axios";
import React, { useEffect, useState } from "react";

export default (props) => {
  const { showCategory, showType, getCategoryAndType, categoryAndType } = props;
  const [state, setState] = useState(true);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [response, setResponce] = useState(null);
  const [CategoryExist, setCategoryExist] = useState(false);
  const [typeExist, setTypeExist] = useState(false);




  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
const checkCategoryExist = () => {
  console.log("called");
  if (categoryAndType != null) {
    const filteredCategories = categoryAndType.Category.filter((item) => {
      return item === category;
    });

    if (filteredCategories.length > 0) {
      console.log(filteredCategories[0] + "....." + category);
      setCategoryExist(true);
    }
  }
};
  const checkTypeExist = () => {
    if (categoryAndType != null) {
      if (type.length != 0) {
        categoryAndType.Type.map((item, index) => {
          if (item === type) {
            setTypeExist(true);
            return false;
          } else {
            setTypeExist(false);
            return true;
          }
        });
      }

      return;
    }
  };
  const handleCategory = async () => {
    console.log("called-----", CategoryExist);
        checkCategoryExist();
    if (!CategoryExist) {
      console.log("categoryExist--->",CategoryExist);
      try {
        const { data } = await axiosInstance.post(
          "/admin/addCategory",
          { category: category },
          { withCredentials: true }
        );
        if (data) {
          console.log(data);
          setResponce(data.updatedDocument);
          
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Item already exists.");
    }
  };
  
  const handleType = async () => {
    checkTypeExist();
    if (typeExist) {
      try {
        const { data } = await axiosInstance.post(
          "/admin/addType",
          { type },
          { withCredentials: true }
        );
        if (data) {
          console.log(data);
          setResponce(data.updatedDocument);
        }
      } catch (err) {
        console.log(err);
      }
      console.log("Item already exists.");
      setCategoryExist(false);
      return;
    }
  };

  if (response != null) {
    console.log("response--->", response);
    getCategoryAndType(response);
    window.location.reload();
  }
  return (
    <>
      {showCategory && (
        <>
          {state ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setState(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="flex justify-end">
                    <button
                      className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                      onClick={() => setState(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                    <h4 className="text-lg font-medium text-gray-800">
                      Add Category
                    </h4>
                    {/* <p className="text-[15px] text-gray-600">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p> */}
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="relative">
                        <input
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          type="text"
                          placeholder="Enter Your Category"
                          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      {CategoryExist && <p>item Exist</p>}
                      <button
                        onClick={handleCategory}
                        className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {showType && (
        <>
          {
            <>
              {state ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setState(false)}
                  ></div>
                  <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                      <div className="flex justify-end">
                        <button
                          className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                          onClick={() => setState(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mx-auto"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">
                          Add Type
                        </h4>
                        {/* <p className="text-[15px] text-gray-600">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p> */}
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="relative">
                            <input
                              onChange={(e) => {
                                setType(e.target.value);
                                setTypeExist(false); // Reset itemExist when category changes
                              }}
                              type="text"
                              placeholder="Enter Your Type"
                              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                          </div>
                          {typeExist && <p>item Exist</p>}
                          <button
                            onClick={handleType}
                            className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          }
        </>
      )}
    </>
  );
};
