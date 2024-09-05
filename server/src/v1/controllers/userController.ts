import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { userSchema } from "../Schemas/ValidationSchemas";
import User from "../models/User";
import { ZodError } from "zod";

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
