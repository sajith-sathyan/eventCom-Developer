import React from "react";
import AdminSidebar from "../../component/supperAdmin/AdminSideBar/AdminSidebar";
import BannerComponet from "../../component/supperAdmin/Banner/Banner";

function Banner() {
  return (
    <div>
      <div className="flex flex-no-wrap">
        <AdminSidebar />

        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
          <BannerComponet />
        </div>
      </div>
    </div>
  );
}

export default Banner;
