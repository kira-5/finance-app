import React, { useState, useEffect } from "react";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";

const TransactionView = ({ transactions }) => {
	// Helper function to check if a date is today
	const isToday = (date) => {
		const now = new Date();
		const transactionDate = new Date(date);

		// Normalize dates to the same timezone (local time)
		const nowDateString = now.toISOString().split("T")[0];
		const transactionDateString = transactionDate
			.toISOString()
			.split("T")[0];

		console.log("Transaction Date:", transactionDateString);
		console.log("Current Date:", nowDateString);

		return transactionDateString === nowDateString;
	};

	// Helper function to check if a date is within the last 7 days
	const isLast7Days = (date) => {
		const now = new Date();
		const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
		const nowIST = new Date(now.getTime() + istOffset);
		const transactionDate = new Date(date);
		const past7Days = new Date();
		// past7Days.setDate(now.getDate() - 7);
		past7Days.setDate(nowIST.getDate() - 7);
		return transactionDate >= past7Days;
	};

	// Filter transactions based on selected time frame
	const filterTransactions = () => {
		// const now = new Date();

		return transactions
			.filter((transaction) => {
				const { date } = transaction;
				if (timeFrame === "today") {
					return isToday(date);
				} else if (timeFrame === "last7days") {
					return isLast7Days(date);
				} else {
					return true; // Show all if 'recent'
				}
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (desc)
			.slice(0, 5); // Get top 5 transactions
	};
	const [timeFrame, setTimeFrame] = useState("recent");
	// Effect to check the time and set default time frame
	useEffect(() => {
		const now = new Date();
		// const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
		// const nowIST = new Date(now.getTime() + istOffset);
		const hours = now.getHours();

		// Update time frame to "today" if current IST time is after 5 PM
		if (hours >= 17) {
			setTimeFrame("today");
		} else {
			setTimeFrame("recent");
		}
	}, []);

	return (
		<div>
			<Typography variant="h6" mt={3}>
				Transactions
			</Typography>
			<FormControl fullWidth style={{ marginBottom: "16px" }}>
				<InputLabel>Filter by Time Frame</InputLabel>
				<Select
					value={timeFrame}
					onChange={(e) => setTimeFrame(e.target.value)}
					label="Filter by Time Frame"
				>
					<MenuItem value="recent">Recent</MenuItem>
					<MenuItem value="today">Today</MenuItem>
					<MenuItem value="last7days">Last 7 Days</MenuItem>
				</Select>
			</FormControl>
			<List>
				{filterTransactions().map((transaction, index) => (
					<React.Fragment key={index}>
						<ListItem>
							<ListItemText
								primary={`${transaction.category} - $${transaction.amount}`}
								secondary={transaction.date}
							/>
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</div>
	);
};

export default TransactionView;
