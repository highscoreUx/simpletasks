interface Itask {
	title: string;
	createdBy: string;
	assignedTo?: string[];
	taskStatus?:
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
