import React from 'react'
import AdminEditEvent from "../../component/supperAdmin/AdminEditEvent/AdminEditEvent"

function EditEvent() {
  return (
    <div>
    <div className="flex flex-no-wrap">
      <AdminSidebar />

      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
      <AdminEditEvent/>
      </div>
    </div>
  </div>
   
  )
}

export default EditEvent