import React, { useState } from "react";
import BlockAndUnBlock from "../BlockAndUnBolck/BlockAndUnBlock";
function ListUser(props) {
  const [showQickView, setQickView] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [userId, setUserId] = useState(null);
  const [CurrStatus, setCurrStatus] = useState("");
  const { users } = props;
  //   console.log("======>", users);
 
  const pathToEdit = (userid) => {
    console.log("userid--||->", userid);
  };

  const handleQickView = () => {
    if (showQickView) {
      setQickView(false);
    } else {
      setQickView(true);
    }
  };
  var showBlockPopUp = (Status) => {
    setShowBlock(Status);
  };
  const GetUserId = (id, checkStatus) => {
    setCurrStatus(checkStatus);
    console.log(id);
    setUserId(id);
    showBlockPopUp(true);
  };

  if (userId !== null) {
  }

  console.log(showBlock);
  return (
    <>
      <div className="2xl:w-3/4 2xl:w-4/5 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              User Mangement
            </p>
            <div className="mt-4 sm:mt-0">
              {/* <button className="inline-flex sm:ml-3 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                 <p className="text-sm font-medium leading-none text-white">Download All</p>
               </button> */}
            </div>
          </div>
        </div>

        <div className="bg-white px-4 md:px-10 pb-5"></div>
        <br />
        <br />
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Mobile</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y pl-10">
              {users.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src={item.avatar} className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.username}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Status === "active" && (
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs ${
                          item.status == "Active"
                            ? "text-green-600 bg-green-50"
                            : "text-green-600 bg-green-50"
                        }`}
                      >
                        {item.Status}
                      </span>
                    )}
                    {item.Status === "Blocked" && (
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs ${
                          item.status == "Active"
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-blue-50"
                        }`}
                      >
                        {item.Status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.mobile}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <button
                      onClick={() => GetUserId(item._id, item.Status)}
                      href="javascript:void()"
                      className="py-2 leading-none px-3 font-medium text-green-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      {item.Status === "active" && "active"}
                      {item.Status === "Blocked" && (
                        <span className="text-red-600 font-medium">
                          Unblock
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showBlock && (
            <>
              <BlockAndUnBlock
                showBlockPopUp={showBlockPopUp}
                UserId={userId}
                CurrStatus={CurrStatus}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ListUser;
