import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { init } from "d2";
import reportWebVitals from "./reportWebVitals";

//Bootstrap related css files
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//import $ from 'jquery';
//  import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const URL = `https://play.dhis2.org/2.33.7/api`;

const rootElement = document.getElementById("root");

const withBaseUrl = (baseUrl) => {
  init({
    baseUrl: baseUrl,
    headers: {
      Authorization: "Basic " + btoa("admin:district"),
      "Content-Type": "application/json",
      withCredentials: true,
      mode: "cors",
    },
  });

  ReactDOM.render(<App />, rootElement);
};

withBaseUrl(URL);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
