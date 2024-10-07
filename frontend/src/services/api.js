// src/utils/api.js
import ToastMessage from "../components_old/ToastMessage";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

export const fetchData = async (
	url,
	method = "GET",
	body = null,
	headers = {}
) => {
	try {
		const response = await fetch(`${API_DOMAIN}${url}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			body: body ? JSON.stringify(body) : null,
		});

		const responseBody = await response.text(); // Read as text first

		if (!response.ok) {
			const status = response.status;
			let errorMessage = "Something went wrong";

			if (status === 404) {
				errorMessage = "Not Found";
			} else if (status === 500) {
				errorMessage = "Server Error";
			}

			// ToastMessage(status, responseBody.detail);
		}

		try {
			const jsonData = JSON.parse(responseBody);
			if (jsonData.status === 200) {
				return jsonData;
			} else {
				const errorMessage =
					jsonData.detail || "Unexpected error occurred";
				ToastMessage(jsonData.status, errorMessage);
			}
		} catch (jsonError) {
			console.error("Failed to parse JSON response:", responseBody);
			ToastMessage(500, "Failed to parse JSON response");
		}
	} catch (error) {
		console.error("API call error:", error.message);
		ToastMessage(500, error.message);
		// throw new Error(errorMessage);
	}
};

export const postData = async (endpoint, data) => {
	try {
		const response = await fetch(`${API_DOMAIN}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || "Failed to submit data");
		}

		// Optionally handle the response, depending on your API
		return await response.json();
	} catch (error) {
		console.error("API call error:", error.message);
		throw error; // Re-throw the error to be handled by the calling code
	}
};
