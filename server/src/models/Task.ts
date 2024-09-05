import mongoose, { Document } from "mongoose";

interface Itask extends Document {
	title: string;
	createdBy: string;
	assignedTo?: string[];
	taskStatus:
		| "Not Started"
		| "in Progress"
		| "Submitted"
		| "Cancelled"
		| "Expired";
	assignedOn: string;
	dueDate?: string;
	description?: string;
	priority: "Low" | "Medium" | "High" | "None";
	tags?: string[];
	completedOn?: string;
	comments?: string[];
}

const taskSchema = new mongoose.Schema<Itask>(
	{
		title: { type: String, required: [true, "Title cannot be empty"] },
		createdBy: { type: String, required: [true, "Creator cannot be empty"] },
		assignedTo: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		taskStatus: {
			type: String,
			enum: ["Not Started", "in Progress", "Submitted", "Cancelled", "Expired"],
			default: "Not Started",
		},
		assignedOn: {
			type: String,
			required: [true, "Date Assigned cannot be empty"],
		},
		dueDate: { type: String },
		description: { type: String },
		priority: {
			type: String,
			enum: ["Low", "Medium", "High", "None"],
			default: "None",
		},
		tags: [
			{
				type: String,
			},
		],
		completedOn: String,
		comments: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true },
);
const Task = mongoose.model<Itask>("Task", taskSchema);

export default Task;
