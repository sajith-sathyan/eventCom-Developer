import React, { useState } from "react";
const Dropdown = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div className=" flex justify-end bg-color-red bg-slate-950 w-10" onClick={() => setShow(!show)}>
        <div className="cursor-pointer text-xl dark:text-gray-400 ">
          {show ? ":" : ":"}
        </div>
      </div>
      {show && (
        <ul className="visible transition duration-300 opacity-100 bg-white dark:bg-gray-800  shadow rounded mt-2 py-1 w-48  fixed">
          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 flex items-center">
            <span className="ml-2 font-normal">View</span>
          </li>
          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 flex items-center">
            <span className="ml-2 font-normal">Edit</span>
          </li>
          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 flex items-center">
            <span className="ml-2 font-normal">Delete</span>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
