import React, { useState } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled(Paper)(({ theme }) => ({
	maxWidth: 500,
	margin: "0 auto",
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[3],
	backgroundColor: theme.palette.background.default, // Light background
}));

const Field = styled(TextField)(({ theme }) => ({
	margin: theme.spacing(1, 0),
	"& .MuiInputBase-root": {
		color: theme.palette.text.primary, // Text color for input
	},
	"& .MuiFormLabel-root": {
		color: theme.palette.text.secondary, // Label color
	},
	"& .MuiInputBase-input": {
		backgroundColor: theme.palette.background.paper, // Background color for input
	},
}));

const SaveButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	backgroundColor: theme.palette.primary.main, // Primary color
	color: theme.palette.common.white, // Text color on button
	"&:hover": {
		backgroundColor: theme.palette.primary.dark, // Darker shade on hover
	},
}));

const AddTransaction = ({ categories, onSave }) => {
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [transactionType, setTransactionType] = useState("expense");
	const [note, setNote] = useState("");
	const [date, setDate] = useState("");

	const handleSave = () => {
		if (amount && category && date) {
			// Ensure essential fields are filled
			const transaction = {
				date,
				category,
				transactionType,
				amount,
				note,
			};
			onSave(transaction);
		}
	};

	return (
		<Container elevation={3}>
			<Typography
				variant="h5"
				gutterBottom
				align="center"
				color="primary"
			>
				Add Transaction
			</Typography>

			<Field
				label="Amount"
				type="number"
				fullWidth
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Enter amount"
			/>

			<Field
				select
				label="Category"
				fullWidth
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				placeholder="Select category"
			>
				{categories.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</Field>

			<ToggleButtonGroup
				value={transactionType}
				exclusive
				onChange={(e, value) => setTransactionType(value)}
				sx={{ display: "flex", justifyContent: "center", my: 2 }}
			>
				<ToggleButton
					value="expense"
					sx={{
						color: "red",
						"&.Mui-selected": {
							color: "white",
							backgroundColor: "red",
						},
					}}
				>
					Expense
				</ToggleButton>
				<ToggleButton
					value="income"
					sx={{
						color: "green",
						"&.Mui-selected": {
							color: "white",
							backgroundColor: "green",
						},
					}}
				>
					Income
				</ToggleButton>
			</ToggleButtonGroup>

			<Field
				label="Notes"
				fullWidth
				multiline
				rows={2}
				value={note}
				onChange={(e) => setNote(e.target.value)}
				placeholder="Enter notes (optional)"
			/>

			<Field
				label="Date"
				type="date"
				fullWidth
				value={date}
				onChange={(e) => setDate(e.target.value)}
				InputLabelProps={{ shrink: true }}
			/>

			<SaveButton
				variant="contained"
				fullWidth
				onClick={handleSave}
				disabled={!amount || !category || !date} // Disable if essential fields are empty
			>
				Save Transaction
			</SaveButton>
		</Container>
	);
};

export default AddTransaction;
