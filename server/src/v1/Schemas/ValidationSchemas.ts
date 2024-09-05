import { z } from "zod";

export const userSchema = z.object({
	email: z
		.string()
		.email({ message: "Please provide a valid email" })
		.toLowerCase()
		.trim()
		.min(1, { message: "email cannot be one character" }),
	password: z.string(),
	role: z.enum(["user", "admin"]).default("user"),
	isVerified: z.boolean().default(false),
	isActive: z.boolean().default(true),
});

export const taskSchema = z.object({
	title: z.string().min(1, { message: "Title cannot be empty" }),
	createdBy: z.string().min(1, { message: "Creator is Required" }),
	assignedTo: z
		.array(z.string().min(1, { message: "at least one assignee" }))
		.optional(),
	taskStatus: z
		.enum(["Not Started", "in Progress", "Submitted", "Cancelled", "Expired"], {
			message:
				"Task could either be Not Started, In Progress, Submitted, Cancelled or Expired",
		})
		.default("Not Started"),
	assignedOn: z.string().min(1, { message: "Date assigned cannot be empty" }),
	dueDate: z.string().min(1, { message: "Due cannot be empty" }).optional(),
	description: z
		.string()
		.min(1, { message: "Please provide valid description" })
		.optional(),
	priority: z
		.enum(["Low", "Medium", "High", "None"], {
			message: "priority could either be Low, Medium, High or None",
		})
		.default("None"),
	tags: z.array(z.string()).optional(),
	completedOn: z
		.string()
		.min(1, { message: "Date completed cannot be empty" })
		.optional(),
	comments: z.array(z.string()).optional(),
});
