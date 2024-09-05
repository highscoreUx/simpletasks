import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import setPageTitle from "../Utilities/setPageTitle";

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

setPageTitle("Sign Up");

const Signup: React.FC = () => {
	const [isEmailLogin, setIsEMailLogin] = useState<Boolean>(false);
	const [page, setPage] = useState("");
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

	return (
		<div className="w-full sm:w-[350px]">
			<div>
				<div className="w-full flex items-center justify-center mb-4">
					<div className="w-[56px]">
						<Logo />
					</div>
				</div>
				<h2 className="text-center mb-1 leading-tight">Create Free Account</h2>
				<p className="text-sm text-center">
					Own a free account and manage tasks seamlessly
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
									className="mt-2 bg-neutral-800 text-white disabled:bg-neutral-400 disabled:text-neutral-500"
									disabled={!allValidationsPassed}
								>
									Finish sign up
								</button>
							</div>
						</form>
					) : (
						<form>
							<div className="flex flex-col gap-1">
								<input
									type="email"
									name="email"
									value={credentials.email}
									onChange={(e) => {
										setCredentials({
											...credentials,
											email: e.currentTarget.value,
										});
									}}
									placeholder="Enter your email address"
									className="p-3 rounded-lg border placeholder:text-sm"
								/>
								<button
									type="submit"
									className="mt-2 bg-neutral-800 text-white"
									onClick={(e) => {
										e.preventDefault();
										setPage("password");
									}}
								>
									Continue with Email
								</button>
							</div>
						</form>
					)}
				</div>
			) : (
				<div className="flex flex-col gap-4 mt-8">
					<button className="hover:bg-neutral-800 hover:text-white flex items-center gap-2 justify-center">
						<FaGoogle size={16} /> Continue with Google
					</button>
					<button
						className="hover:bg-neutral-800 hover:text-white flex items-center gap-2 justify-center"
						onClick={() => {
							setIsEMailLogin(true);
						}}
					>
						<MdOutlineMail size={16} /> Continue with email
					</button>
				</div>
			)}
			<div className="w-full sm:w-[300px] mx-auto flex flex-col items-center">
				<p className="text-sm mt-4 text-neutral-500/80 text-center">
					By signing up, you agree to out{" "}
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
					Already have an account?{" "}
					<Link
						to={"/auth/login"}
						className="text-neutral-800 font-semibold hover:underline"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
