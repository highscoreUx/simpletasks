import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

interface Iuser extends Document {
	email: string;
	password: string;
	role: "user" | "admin";
	isVerified: boolean;
	isActive: boolean;
}

const userSchema = new mongoose.Schema<Iuser>(
	{
		email: {
			type: String,
			required: [true, "Please provide email address"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a valid password"],
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

userSchema.pre<Iuser>("save", async function () {
	if (this.isModified("password") || this.isNew) {
		try {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		} catch (error) {
			console.error(error);
		}
	}
});

const User = mongoose.model<Iuser>("User", userSchema);

export default User;
