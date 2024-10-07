const isDevelopment = process.env.NODE_ENV === "development";

const log = (message) => {
	if (isDevelopment) {
		console.log(message);
	}
};

const error = (message) => {
	console.error(message);
};

export default { log, error };
