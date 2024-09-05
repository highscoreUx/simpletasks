const setPageTitle = (title?: string) => {
	const fallback = "Simple tasks | Welcome to simple task";
	const pre = `Simple Tasks | ${title}`;
	document.title = title ? pre : fallback;
};

export default setPageTitle;
