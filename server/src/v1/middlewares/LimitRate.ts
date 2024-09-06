import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

export const limiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 3,
	skipSuccessfulRequests: true,
	message: "Too many Login attempts, try  again in 24Hours",

	handler: (_req: Request, res: Response) => {
		res
			.status(StatusCodes.TOO_MANY_REQUESTS)
			.json({ msg: `Too many Login attempts, try again later` });
	},
});
