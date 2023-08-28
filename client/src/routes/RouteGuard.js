import React from "react";
import { Route, Navigate, } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(!token);
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default RouteGuard;
