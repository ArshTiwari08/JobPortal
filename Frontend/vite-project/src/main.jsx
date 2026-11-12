import React from "react";
import ReactDOM from "react-dom/client";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import Login from "./components/Sheared/Login.jsx";
import Signup from "./components/Sheared/Signup.jsx";
import Home from "./components/Sheared/Home.jsx";
import Layout from "./layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="Home" element ={<Home/>}/>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);