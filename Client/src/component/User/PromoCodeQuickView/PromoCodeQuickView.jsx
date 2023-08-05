import React from "react";
import axiosInstance from "../../../Helper/axiosInstance"
function PromoCodeQuickView(props) {
  const { basicInfoId, getAdmissionData, getTicketData } = props;

  const Navigate = useNavigate();
  console.log("props-->", basicInfoId);
  const [state, setState] = useState(true);

  const [name, setName] = useState("");
  const [TotalQuantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [MaxQuntiy, SetMaxQuntiy] = useState("");
  const [MinQuntiy, setMinQuntiy] = useState("");
  const [Description, SetDescription] = useState("");

  const [ticketStatus, setTicketStatus] = useState("");

  // send the data to the data base
  const AddonsHandleSubmit = async (e) => {
    e.preventDefault();
    const AddOns = {
      name,
      TotalQuantity,
      price,
      Description,
      MaxQuntiy,
      MinQuntiy,
      startDate,
      startTime,
      endDate,
      endTime,
    };

    try {
      const responce = await axiosInstance.post(
        "/addTickets",
        {
          basicInfoId,
          AddOns: AddOns,
        },
        { withCredentials: true }
      );
      console.log("responce--->", responce);
      if (responce.data.Addmission) {
        setState(false);
        getAdmissionData(true);
        getTicketData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return state ? (
    <div className="fixed absolute inset-0 z-50 overflow-y-auto h-500 w-500">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setState(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-medium text-gray-800">Add tickets</h4>
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

          <div className="space-y-2 p-4  text-[12.5px] leading-relaxed text-gray-500">
            <div>
              <label className="font-medium">Code name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Amount </label>
              <input
                type="Number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="Number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Description</label>
              <input
                onChange={(e) => SetDescription(e.target.value)}
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-row ">
              <div>
                <label className="font-medium">Minimum Quntity</label>
                <input
                  onChange={(e) => setMinQuntiy(e.target.value)}
                  type="Number"
                  required
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="font-medium">Maximum Quntity</label>
                <input
                  onChange={(e) => SetMaxQuntiy(e.target.value)}
                  type="Number"
                  required
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]sm:text-sm tracking-wide text-black-600"
                >
                  {" "}
                  Sales Start Date*{" "}
                </label>
                <input
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                >
                  {" "}
                  Sales Start Time*{" "}
                </label>
                <input
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-row ">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px]  tracking-wide text-black-600"
                >
                  {" "}
                  Sales End Date*{" "}
                </label>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  name=""
                  id=""
                  className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 text-[12.5px] tracking-wide text-black-600"
                >
                  {" "}
                  Sales End Time*{" "}
                </label>
                <input
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  name=""
                  id=""
                  className="mx-2 text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-400 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="flex position: fixed; items-center gap-3 p-4 mt-5 border-t">
            <button
              className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              onClick={AddonsHandleSubmit}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PromoCodeQuickView;
