// src/components/SubmitForm.js
import React, { useState } from "react";
import { apiCall } from "../utils/api";

const SubmitForm = () => {
	const [formData, setFormData] = useState({ name: "", email: "" });
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await apiCall("/submit", "POST", formData);
			setMessage(`Success: ${result.message}`);
		} catch (err) {
			setMessage(`Error: ${err.message}`);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Name"
			/>
			<input
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<button type="submit">Submit</button>
			{message && <p>{message}</p>}
		</form>
	);
};

export default SubmitForm;
