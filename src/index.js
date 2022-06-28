import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "http://94.74.86.174:8080/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";

root.render(
  <CookiesProvider>
    <Routes />
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
