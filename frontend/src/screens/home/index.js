import React from "react";
import { Route } from "react-router-dom";
import Controller from "./controller";
import View from "./view";

const Screen = {
  name: "home",
  Controller,
  View,
  Route: <Route exact path="/" component={Controller} />,
};

export default Screen;
