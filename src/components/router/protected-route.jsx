import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ forSigned }) => {
  const isAuthenticated = useSelector((state) => !!state.user.signedUser);

  const canAccess =
    (forSigned && isAuthenticated) || (!forSigned && !isAuthenticated);

  let redirectTo = "/";
  if (!isAuthenticated && forSigned) {
    redirectTo = "/sign/form";
  } else if (isAuthenticated && !forSigned) {
    redirectTo = "/";
  }

  return canAccess ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
