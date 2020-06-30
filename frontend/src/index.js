import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css";

import * as serviceWorker from "./serviceWorker";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import HomeScreen from "./screens/home";

const routes = (
  <Router>
    <Switch>{HomeScreen.Route}</Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
