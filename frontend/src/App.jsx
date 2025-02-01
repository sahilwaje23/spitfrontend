import React from "react";
import {
  AddMenu,
  AllMenus,
  LandingPage,
  ManagerSideMenus,
  ManagerSignin,
  PlaceOrder,
  UserProfile,
  UserSignin,
  UserSignup,
} from "./Components";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-black text-white">
      {/* <UserSignup/>
      <UserSignin/>
      <ManagerSignin/> */}
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-signin" element={<UserSignin />} />
        <Route path="/manager-signin" element={<ManagerSignin />} />
        <Route path="/manager-menu" element={<ManagerSideMenus />} />
        <Route path="/user-menu" element={<AllMenus />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/all-menu" element={<AllMenus />} />
      </Routes>
    </div>
  );
};

export default App;
