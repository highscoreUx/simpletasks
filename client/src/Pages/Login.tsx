import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
import setPageTitle from "../Utilities/setPageTitle";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Utilities/api";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { useAuthContext } from "../context/AuthContext";

interface ICredentials {
	email: string;
	password: string;
}

interface Ivalidation {
	number: boolean;
	length: boolean;
	hasCapital: boolean;
	hasSmall: boolean;
	hasSpecial: boolean;
}

setPageTitle("Login");

const Login: React.FC = () => {
	const [isEmailLogin, setIsEMailLogin] = useState<Boolean>(false);
	const [page, setPage] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { setUser, setAccessToken, setIsLoggedin } = useAuthContext();
	const [credentials, setCredentials] = useState<ICredentials>({
		email: "",
		password: "",
	});
	const [validation, setValidation] = useState<Ivalidation>({
		number: false,
		hasCapital: false,
		hasSmall: false,
		hasSpecial: false,
		length: false,
	});

	const allValidationsPassed = Object.values(validation).every(Boolean);
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const navigateLocation = location?.state?.from?.pathname || "/dashboard";

	const { isPending, mutate } = useMutation({
		mutationKey: ["Sign in"],
		mutationFn: (obj: object) => {
			return loginUser(obj);
		},
		onSuccess: (data) => {
			const user = {
				id: data.id,
				role: data.role,
			};
			setUser(user);
			setAccessToken(data.accessToken);
			setIsLoggedin(true);
			const converted = JSON.stringify(user);
			localStorage.setItem("user", converted);
			toast.dismiss();
			toast.success(data.msg);
			console.log(location);
			navigate(navigateLocation);
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		mutate(credentials);
	};

	return (
		<div className="w-full sm:w-[350px]">
			<div>
				<div className="w-full flex items-center justify-center mb-4">
					<div className="w-[56px]">
						<Logo />
					</div>
				</div>
				<h2 className="text-center mb-1 leading-tight">Welcome Back</h2>
				<p className="text-sm text-center">
					Sign in now and continue to manage tasks seamlessly
				</p>
			</div>
			{isEmailLogin ? (
				<div className="mt-8">
					{page === "password" ? (
						<form>
							<div className="flex flex-col gap-1">
								<input
									type="password"
									name="password"
									title="password"
									autoComplete="new-password"
									value={credentials.password}
									onChange={(e) => {
										setCredentials({
											...credentials,
											password: e.currentTarget.value,
										});
										setValidation({
											hasCapital: /[A-Z]/.test(e.currentTarget.value),
											number: /[0-9]/.test(e.currentTarget.value),
											hasSmall: /[a-z]/.test(e.currentTarget.value),
											length: e.currentTarget.value.length > 7,
											hasSpecial: /[!@#$%^&*()_+]/.test(e.currentTarget.value),
										});
									}}
									placeholder="Enter your password"
									className="p-3 rounded-lg border placeholder:text-sm"
								/>
								{credentials.password.length > 0 && !allValidationsPassed && (
									<div className="mt-4 border rounded-lg p-3 text-neutral-500 text-sm">
										<p
											className={`${validation.hasCapital && "text-neutral-800"}`}
										>
											{validation.hasCapital ? "✓" : "✗"} Password must contain
											a capital letter
										</p>
										<p
											className={`${validation.hasSmall && "text-neutral-800"}`}
										>
											{validation.hasSmall ? "✓" : "✗"} Password must contain a
											small letter
										</p>
										<p className={`${validation.number && "text-neutral-800"}`}>
											{validation.number ? "✓" : "✗"} Password must contain a
											Number
										</p>
										<p className={`${validation.length && "text-neutral-800"}`}>
											{validation.length ? "✓" : "✗"} Password must at least 8
											characters
										</p>
										<p
											className={`${validation.hasSpecial && "text-neutral-800"}`}
										>
											{validation.hasSpecial ? "✓" : "✗"} Password must contain
											a special Character
										</p>
									</div>
								)}

								<button
									type="submit"
									className="mt-4 bg-neutral-800 text-white disabled:bg-neutral-300 disabled:text-neutral-500"
									disabled={!allValidationsPassed || isPending}
									onClick={handleSubmit}
								>
									{isPending ? <Loader size={18} /> : "Complete Login"}
								</button>
								<button
									className="mt-2"
									onClick={() => {
										setPage("");
									}}
								>
									Go Back
								</button>
							</div>
						</form>
					) : (
						<form>
							<div className="flex flex-col gap-1">
								<input
									type="email"
									name="email"
									title="email"
									value={credentials.email}
									onChange={(e) => {
										setCredentials({
											...credentials,
											email: e.currentTarget.value,
										});
										setIsValidEmail(emailRegex.test(e.currentTarget.value));
									}}
									placeholder="Enter your email address"
									className="p-3 rounded-lg border placeholder:text-sm"
								/>
								<button
									type="submit"
									className="mt-4 bg-neutral-800 text-white disabled:bg-neutral-300 disabled:text-neutral-500"
									disabled={!isValidEmail}
									onClick={(e) => {
										e.preventDefault();
										setPage("password");
									}}
								>
									Continue with Email
								</button>
								<button
									className="mt-2"
									onClick={() => {
										setIsEMailLogin(false);
									}}
								>
									Go Back
								</button>
							</div>
						</form>
					)}
				</div>
			) : (
				<div className="flex flex-col gap-4 mt-8">
					<button className="hover:bg-neutral-800 hover:text-white flex items-center gap-2 justify-center">
						<FaGoogle size={16} /> Login with Google
					</button>
					<button
						className="hover:bg-neutral-800 hover:text-white flex items-center gap-2 justify-center"
						onClick={() => {
							setIsEMailLogin(true);
						}}
					>
						<MdOutlineMail size={16} /> Login with email
					</button>
				</div>
			)}
			<div className="w-full sm:w-[300px] mx-auto flex flex-col items-center">
				<p className="text-sm mt-4 text-neutral-500/80 text-center">
					By signing In, you agree to out{" "}
					<Link
						to={"/terms-of-service"}
						className="text-neutral-800 font-semibold hover:underline"
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						to={"/privacy-policy"}
						className="text-neutral-800 font-semibold hover:underline"
					>
						Privacy Policy
					</Link>
				</p>
				<p className="mt-2">---</p>
				<p className="text-sm mt-4 text-neutral-500/80 text-center">
					Don't have an account yet?{" "}
					<Link
						to={"/auth/signup"}
						className="text-neutral-800 font-semibold hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
