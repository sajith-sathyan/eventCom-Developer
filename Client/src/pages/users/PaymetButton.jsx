import React, { useState, useRef, useEffect } from "react";
  import QRCode from "qrcode";
  import { QrReader } from "react-qr-reader";

function PaymetButton() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [data, setData] = useState("hello world my dear");
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const responce = await QRCode.toDataURL(text);
      console.log("responce-->", responce);
      setImageUrl(responce);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleScanFile();
    onScanFile();
    handleScanFile();
  }, [handleScanFile, onScanFile, handleScanFile]);

  const handleErrorFile = (Error) => {
    console.log(Error);
  };

  const handleScanFile = (result) => {
    if (result) {
      console.log(result);
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {};

  const onResult = (result, error) => {
    if (result) {
      console.log(result);
      setData(result.text);
    }

    if (!error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <br /> <br /> <br />
      <div className="bg-blue-100  w-1/2">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <br /> <br /> <br />
        <button
          onClick={() => generateQrCode()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate QR Code
        </button>
        <br /> <br /> <br />
        {imageUrl ? (
          <a href={imageUrl} download>
            <img
              src={imageUrl}
              alt="Image"
              className="rounded-lg shadow-lg w-48 h-48 object-cover"
            />
          </a>
        ) : null}
      </div>
      {/* ----------------------------------------------- */}
      <div className="bg-white w-1/2">
        <div className="w-48 h-48">
          <QrReader onResult={onResult} className="w-full" />
        </div>

        <p>{data}</p>
        <h1>Scanned web cam: {data&&data}</h1>
      </div>
    </div>
  );
}

export default PaymetButton;

