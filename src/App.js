import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Componnets/Sidebar";
// import "./assets/scss/theme.scss";
// import "./assets/scss/custom/structure/_topbar.scss"
// import "./assets/scss/custom/structure/_vertical.scss"
import "../src/common.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Payment from "./Componnets/Payment";
import Dashboard from "./Componnets/Dashboard";
import Bank from "./Componnets/Bank";
import Directmem from "./Componnets/Directmem";
import Earning from "./Componnets/Earning";
import Letter from "./Componnets/Letter";
import Levelwise from "./Componnets/Levelwise";
import Members from "./Componnets/Members";
import Withdrawal from "./Componnets/Withdrawal";
import Ticket from "./Componnets/Ticket";
import Profile from "./Componnets/Profile";
import Notification from "./Componnets/Notification";
import Advertisements from "./Componnets/Advertisements";
import PlanAds from "./Componnets/PlanAds";
import Subads from "./Componnets/Subads";
import CommercialAds from "./Componnets/CommercialAds";
import PrivateAds from "./Componnets/PrivateAds";
import Login from "./Componnets/Login";
import Regester from "./Componnets/Regester";
import Regester1 from "./Componnets/Regester1";
// import Regesters from "./Componnets/Regesters";
import Forgot from "./Componnets/Forgot";
import Otp from "./Componnets/Otp";
import Changepass from "./Componnets/Changepass";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/register" element={<Regester />} />

          <Route path="/Otp" element={<Otp />} />
          <Route path="/Changepass" element={<Changepass />} />

          {/* <Route path="/registers/:id" element={<Regester1 />} /> */}
          <Route path="/register/:id" element={<Regester1 />} />
          {/* <Route path="/registers" element={<Regesters />} /> */}
          {sessionStorage.getItem("UserId") != "" &&
          sessionStorage.getItem("UserId") ? (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/pay" element={<Payment />} />
              <Route path="/Letter" element={<Letter />} />
              <Route path="/Members" element={<Members />} />
              <Route path="/Directmem" element={<Directmem />} />
              <Route path="/Levelwise" element={<Levelwise />} />
              <Route path="/Bank" element={<Bank />} />
              <Route path="/Earning" element={<Earning />} />
              <Route path="/Withdrawal" element={<Withdrawal />} />
              <Route path="/Ticket" element={<Ticket />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Notifications" element={<Notification />} />
              <Route path="/advertisements" element={<Advertisements />} />
              <Route path="/plan-ads" element={<PlanAds />} />
              <Route path="/sub-ads" element={<Subads />} />
              <Route path="/commercial-ads" element={<CommercialAds />} />
              <Route path="/private-ads" element={<PrivateAds />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
