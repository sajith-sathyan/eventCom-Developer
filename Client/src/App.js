import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import UserRouteProtected from "./ProtectedRoutes/UserRouteProtected";
import AdminProtectedRoute from "./ProtectedRoutes/adminProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
// user
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Home from "./pages/users/Home";
import BasicinfoPage from "./pages/users/Basicinfo";
import Details from "./pages/users/DetailsPage";
import Tickets from "./pages/users/Tickets";
import OrganizationsHome from "./pages/users/OrganizationsHome";
import OrganizationsEvent from "./pages/users/OrgEvent";
import OrganizationsSidebar from "./pages/users/OrgStatitics";
import ViewEventDetials from "./pages/users/ViewEventDetials";
import EditBasicInfoPage from "./pages/users/EditBasicInfoPage";
import CreateTickets from "./pages/users/CreateTicket";
import UserAccount from "./pages/users/UserAccount";
import EditEvent from "./pages/users/EditEvent";
import PaymetButton from "./pages/users/PaymetButton";
import EventTicket from "./pages/users/EventTicket";
import YourTickets from "./pages/users/YourTickets";
import CheckOut from "./pages/users/CheckOut";
import TESTLOGIN from "./pages/users/TESTLOGINN";
import TESTREGESTER from "./pages/users/TESTREGESTER";
import TESTHOME from "./pages/users/TESTHOME";
// admin
import Dashboard from "./pages/supperAdmin/Userlist";
import ApproveEvent from "./pages/supperAdmin/ApproveEvent";
import CategoryAndType from "./pages/supperAdmin/CategoryAndType";
import AdminDashboard from "./pages/supperAdmin/AdminDashboard";
import AdminLoginPage from "./pages/supperAdmin/AdminLogin";
import Banner from "./pages/supperAdmin/Banner";
import FourNotFourPage from "./pages/users/404";


import NearestLocationFinder from "./pages/users/Location";

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
      <Route path="*" element={<FourNotFourPage />} />
        {/* <Route exact path="/test" element={<Map/>} /> */}
        <Route exact path="/location" element={<NearestLocationFinder />} />

        {/* authentiactioin routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* home page */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/test" element={<PaymetButton />} />

        <Route element={<UserRouteProtected />}>
          <Route exact path="/manage/create" element={<BasicinfoPage />} />
          <Route exact path="/event/details/:id" element={<Details />} />
          <Route exact path="/Your-Tickets" element={<YourTickets />} />
          <Route
            exact
            path="/organizations/home"
            element={<OrganizationsHome />}
          />
          <Route
            exact
            path="/organizations/event"
            element={<OrganizationsEvent />}
          />
          <Route
            exact
            path="/organizations/:id/editEvent"
            element={<EditEvent />}
          />
          <Route
            exact
            path="/organizations/event/:id/createTicket"
            element={<CreateTickets />}
          />
          <Route
            exact
            path="/organizations/event/:id/tickets"
            element={<Tickets />}
          />
          <Route
            exact
            path="/organizations/event/:id/basicInfo"
            element={<EditBasicInfoPage />}
          />
          <Route
            exact
            path="/organizations/statistics"
            element={<OrganizationsSidebar />}
          />
          <Route exact path="/checkOut/:id" element={<CheckOut />} />
          <Route exact path="/EventTicket" element={<EventTicket />} />
          <Route exact path="/account/:Id" element={<UserAccount />} />
        </Route>

        {/* event creating routes */}

        <Route exact path="/ViewEvent/:Id" element={<ViewEventDetials />} />

        {/* admin Routes */}
        <AdminProtectedRoute
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <AdminProtectedRoute
          exact
          path="/admin/usermangement"
          element={<Dashboard />}
        />
        <AdminProtectedRoute
          exact
          path="/admin/eventManagement"
          element={<ApproveEvent />}
        />
        <AdminProtectedRoute
          exact
          path="/admin/categoryAndType"
          element={<CategoryAndType />}
        />
        <AdminProtectedRoute exact path="/admin/Banner" element={<Banner />} />
        <Route exact path="/admin/Login" element={<AdminLoginPage />} />

        <Route exact path="/TESTLOGIN" element={<TESTLOGIN />} />
        <Route exact path="/TESTREGESTER" element={<TESTREGESTER />} />
        <Route exact path="/TESTHOME" element={<TESTHOME />} />
      </Routes>
    </BrowserRouter>
  );
}
