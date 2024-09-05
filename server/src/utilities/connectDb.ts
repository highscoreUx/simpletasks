import mongoose from "mongoose";

const ConnectDB = async (URI: string) => {
	try {
		await mongoose.connect(URI);
		console.log("Database connected");
	} catch (error) {
		console.error("Something went wrong", error);
	}
};

export default ConnectDB;
