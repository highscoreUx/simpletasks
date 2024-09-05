import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import Signup from "./Pages/Signup.tsx";
import AuthLayout from "./Components/AuthLayout.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "signup",
				element: <Signup />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
