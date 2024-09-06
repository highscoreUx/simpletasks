import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import Signup from "./Pages/Signup.tsx";
import AuthLayout from "./Components/AuthLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

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
	{
		path: "dashboard",
		element: <ProtectedRoute />,
		children: [
			{
				path: "home",
				element: <Dashboard />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<Toaster position="top-center" />
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</AuthContextProvider>
		</QueryClientProvider>
	</StrictMode>,
);
