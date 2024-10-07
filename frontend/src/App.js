// import React from "react";
// import { CssBaseline } from "@mui/material";
// import Dashboard from "./components_old/Dashboard";

// const App = () => {
// 	return (
// 		<>
// 			{/* CssBaseline helps to normalize CSS across different browsers */}
// 			<CssBaseline />
// 			{/* Dashboard is the main component rendering the header and all other dashboard parts */}
// 			<Dashboard />
// 		</>
// 	);
// };

// export default App;

import React, { useState, useEffect } from "react";
import logger from "./services/logger";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import Dashboard from "./UI_1/Dashboard";
import TransactionHistory from "./UI_1/TransactionHistory";
import Analytics from "./UI_1/Analytics";
import { fetchTransactionsFromExcel } from "./utils/utils";

const App = () => {
	const [transactions, setTransactions] = useState([]);

	const categories = [
		"Groceries",
		"Rent",
		"Utilities",
		"Salary",
		"Entertainment",
		"Dining Out",
		"Transportation",
		"Healthcare",
		"Insurance",
		"Investments",
		"Shopping",
		"Travel",
		"Education",
		"Fitness",
		"Gifts",
		"Subscriptions",
		"Loans",
		"Taxes",
		"Savings",
		"Childcare",
	];

	const quickTransferData = [
		{ value: 32.5, color: "primary", label: "32.5% Completed" },
		{ value: 20.8, color: "secondary", label: "20.8% In Progress" },
		{ value: 9.9, color: "warning", label: "9.9% Pending" },
	];

	// Calculate balance, income, and expenses
	const income = transactions
		.filter((t) => t.transactionType === "income")
		.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
	const expenses = transactions
		.filter((t) => t.transactionType === "expense")
		.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
	const balance = income - expenses;

	// Example data for Analytics
	const expenseDistribution = categories.map((category) => ({
		name: category,
		value: transactions
			.filter(
				(t) =>
					t.category === category && t.transactionType === "expense"
			)
			.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
	}));

	const incomeVsExpenses = [
		{ month: "August", income: 1200, expenses: 800 },
		{ month: "September", income: income, expenses: expenses },
	];

	// Fetch transactions from Excel on mount
	useEffect(() => {
		fetchTransactionsFromExcel(setTransactions).then(() =>
			console.log("transactions:", transactions)
		); // log after fetching
	}, []);
	logger.log("First Log");
	logger.error("Second Log");
	return (
		<div>
			{/* Header */}
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Finance Manager</Typography>
				</Toolbar>
			</AppBar>

			<Container>
				{/* Main Content */}
				<Box my={4}>
					{/* Dashboard */}
					<Dashboard
						balance={balance}
						income={income}
						expenses={expenses}
						transactions={transactions}
						categories={categories}
						setTransactions={setTransactions}
					/>

					{/* Transaction History */}
					<TransactionHistory
						transactions={transactions}
						categories={categories}
					/>

					{/* Analytics */}
					<Analytics
						expenseDistribution={expenseDistribution}
						incomeVsExpenses={incomeVsExpenses}
						quickTransferData={quickTransferData}
					/>
				</Box>
			</Container>
		</div>
	);
};

export default App;
