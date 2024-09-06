import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
	const { user, isLoggedin } = useAuthContext();
	const location = useLocation();

	console.log({ user, isLoggedin });

	if (!user || !isLoggedin) {
		return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
