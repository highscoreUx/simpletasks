import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

//@ts-ignore
export const Authorize = (req: Request, res: Response, next: NextFunction) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith("Bearer")
	) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "unauthorized" });
	}

	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_HASH!);
		console.log(decoded);
		//@ts-ignore
		req.user = decoded;
		next();
	} catch (error) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: ReasonPhrases.UNAUTHORIZED });
	}
};

export const authorizePermission = (...roles: string[]) => {
	//@ts-ignore
	return (req: Request, res: Response, next: NextFunction) => {
		//@ts-ignore
		if (!req.user || !roles.includes(req.user.role)) {
			return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
		}
		next();
	};
};
