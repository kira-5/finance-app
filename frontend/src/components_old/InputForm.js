// src/components_old/InputForm.js
import React, { useState } from "react";
import { postData } from "../utils/api";

const InputForm = () => {
	const [text, setText] = useState("");
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);
		setError(null);

		try {
			const result = await postData("/record-transaction/", {
				// text,
				amount: parseFloat(amount),
			}); // Adjust endpoint as needed
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>Submit Form</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="textInput">Text:</label>
					<input
						id="textInput"
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="amountInput">Amount:</label>
					<input
						id="amountInput"
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
						min="0" // Ensures the number is non-negative
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</form>
			{error && <div style={{ color: "red" }}>Error: {error}</div>}
		</div>
	);
};

export default InputForm;
