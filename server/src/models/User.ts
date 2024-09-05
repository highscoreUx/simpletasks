import mongoose, { Document } from "mongoose";

interface Iuser extends Document {
	email: string;
	password: string;
	role: "user" | "admin";
	isVerified: boolean;
	isActive: boolean;
}

const userSchema = new mongoose.Schema<Iuser>({
	email: {
		type: String,
		required: [true, "Please provide email address"],
	},
});
const User = mongoose.model<Iuser>("User", userSchema);

export default User;
