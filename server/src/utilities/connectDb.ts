import mongoose from "mongoose";

export const ConnectDB = async (URI: string) => {
	try {
		await mongoose.connect(URI);
		console.log("Database connected");
	} catch (error) {
		console.error("Something went wrong", error);
	}
};
