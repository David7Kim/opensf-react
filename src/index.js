import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./login/Login";
import SignUp from "./login/Signup";
import FindAccount from "./login/FindAccount";
import FindPassword from "./login/FindPassword";

import SetAdmin from "./login/SetAdmin";
import UpdateProfile from "./login/Setting";
import MainHome from "./home/Home";
import Board from "./board/Board";
import PostView from "./board/PostView";
import ScrollPaging from "./board/ScrollPaging";
import reportWebVitals from "./reportWebVitals";
import Calendar from "./calendar/CalendarApp";

import { Route, BrowserRouter, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainHome />} />
        <Route path="/board" element={<Board />} />
        <Route path="/post/detail/view" element={<PostView />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/update" element={<UpdateProfile />} />
        <Route path="/find/account" element={<FindAccount />} />
        <Route path="/find/password" element={<FindPassword />} />
        <Route path="/set/admin" element={<SetAdmin />} />
        <Route path="/scrollpaging" element={<ScrollPaging />} />
      </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
