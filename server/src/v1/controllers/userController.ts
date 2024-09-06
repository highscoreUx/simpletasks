import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { loginSchema, userSchema } from "../Schemas/ValidationSchemas";
import User from "../models/User";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

//@ts-ignore
export const signUp = async (req: Request, res: Response) => {
	try {
		const validated = userSchema.parse(req.body);
		const user = await User.create(validated);
		res.status(StatusCodes.OK).json(user);
	} catch (error: any) {
		if (error instanceof ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				msg: "Validation error",
				errors: error.errors,
			});
		}

		if (error.code === 11000) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				msg: `user with email ${error.keyValue.email} already exist`,
			});
		}
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `internal server error: ${error}` });
	}
};

//@ts-ignore
export const login = async (req: Request, res: Response) => {
	try {
		const validated = loginSchema.parse(req.body);
		const user = await User.findOne({ email: validated.email });
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: "Please provide valid credentials" });
		}
		const isPasswordCorrect = await bcrypt.compare(
			validated.password,
			user.password,
		);
		if (!isPasswordCorrect) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: "Please provide valid credentials" });
		}
		if (!user.isVerified) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: "Please verify your account to continue" });
		}
		if (!user.isActive) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				msg: "Your Account has been suspended, Please contact support for help",
			});
		}
		const accessToken = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.ACCESS_HASH!,
			{ expiresIn: "10m" },
		);
		const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_HASH!, {
			expiresIn: "30d",
		});
		res
			.status(StatusCodes.OK)
			.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 30,
				// secure: true,
				sameSite: "none",
			})
			.json({
				msg: "Login successful",
				accessToken,
				id: user._id,
				role: user.role,
			});
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				msg: "Validation error",
				errors: error.errors,
			});
		}
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `internal server error: ${error}` });
	}
};

//@ts-ignore
export const refresh = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;
		if (!req.cookies || !refreshToken) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: ReasonPhrases.UNAUTHORIZED });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_HASH!);
		//@ts-ignore
		const id = decoded.id;

		const user = await User.findById(id);
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: ReasonPhrases.UNAUTHORIZED });
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.ACCESS_HASH!,
			{ expiresIn: "10m" },
		);

		res
			.status(StatusCodes.OK)
			.json({ accessToken, id: user._id, role: user.role });
	} catch (error: any) {
		if (error.message === "invalid token") {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ msg: ReasonPhrases.UNAUTHORIZED });
		}
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `internal server error: ${error}` });
	}
};

//@ts-ignore
export const logout = (req: Request, res: Response) => {
	if (!req.cookies.refreshToken) {
		return res
			.status(StatusCodes.NO_CONTENT)
			.json({ msg: "Logout Successful" });
	}
	res
		.clearCookie("refreshToken", {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			// secure: true,
			sameSite: "none",
		})
		.json({ msg: "Logout Successful" });
};
