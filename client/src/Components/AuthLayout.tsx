import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center mx-4 md:mx-6 lg:mx-auto">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
