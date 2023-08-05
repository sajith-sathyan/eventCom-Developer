import React, { useEffect, useState } from "react";
import CategoryAndTypeList from "../CategoryAndTypeList/CategoryAndTypeList";
import AddCategoryAndTypeQuickView from "../AddCategoryAndTypeQuickView/AddCategoryAndTypeQuickView";
import axios from "axios";
import showCategoryAndType from "../showCategoryAndType/showCategoryAndType";

function AddCategoryAndTypeButton(props) {
  const { categoryAndType, categoryIndex, typeIndex } = props;

  const [showCategory, setCategory] = useState(false);
  const [showType, SetShowType] = useState(false);
  const [CategoryAndType, setCategoryAndType] = useState(null);
  const[itemExist,setItemExist]=useState(false)

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });
  console.log("index-------->", index);
  const AddCategory = () => {
    setCategory(!showCategory);
  };
  const AddType = () => {
    SetShowType(!showType);
  };

  const getCategoryAndType = (data) => {
    console.log("data------>", data);
    setCategoryAndType(data);
  };

  // check its category or type
  let index;
  let DeletedData;
  if (categoryIndex != null) {
    index = "Category";
    DeletedData = categoryAndType.Category[categoryIndex];
  }
  if (typeIndex != null) {
    index = "Type";
    DeletedData = categoryAndType.Type[typeIndex];
  }
console.log("DeletedData------>",DeletedData)
  const handleDelete = async () => {
    const { data } = await axiosInstance.post(
      "/admin/DeleteCategoryOrType",
      { index ,DeletedData},
      { withCredentials: true }
    );
    if(data){
      console.log("data---->",data)
      window.location.reload();
    }
  };

  return (
    <>
      {showCategory && (
        <AddCategoryAndTypeQuickView
          showCategory={showCategory}
          getCategoryAndType={getCategoryAndType}
          categoryAndType={categoryAndType}
        />
      )}
      {showType && (
        <AddCategoryAndTypeQuickView
          showType={showType}
          getCategoryAndType={getCategoryAndType}
          categoryAndType={categoryAndType}
        />
      )}
      <div className="flex justify-center mt-8">
        <div onClick={AddCategory} className="text-center">
          <div className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            <span className="text-sm font-medium">Add Category</span>

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
          </div>
        </div>

        <div onClick={AddType} className="text-center">
          <div className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            <span className="text-sm font-medium">Add Type</span>

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
          </div>
        </div>
      </div>
      <div>
        <br />
        <div>
          <div class="flex justify-center">
            <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              {categoryIndex != null && (
                <button class="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                  {categoryAndType.Category[categoryIndex]}
                </button>
              )}
              {typeIndex != null && (
                <button class="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                  {categoryAndType.Type[typeIndex]}
                </button>
              )}
              <button
                onClick={handleDelete}
                class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                title="Delete Product"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default AddCategoryAndTypeButton;
