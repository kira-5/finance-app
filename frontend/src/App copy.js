// 1

// import "./App.css";
// import Home from "..//src/components_old/Home";
// import InputForm from "..//src/components_old/InputForm";
// import { ToastContainer } from "react-toastify";
// import Dashboard from "..//src/components_old/Dashboard";

// function App() {
// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<InputForm></InputForm>
// 				<Home></Home>
// 				<ToastContainer />
// 			</header>
// 		</div>
// 	);
// }

// export default App;

// 2: responseive

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

// 3: UI
// import React, { useState, useEffect } from "react";
// import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
// import Dashboard from "./UI_1/Dashboard";
// import TransactionHistory from "./UI_1/TransactionHistory";
// import Analytics from "./UI_1/Analytics";
// import { fetchTransactionsFromExcel } from "./utils/utils";

// const App = () => {
// 	const [transactions, setTransactions] = useState([]);

// 	const categories = [
// 		"Groceries",
// 		"Rent",
// 		"Utilities",
// 		"Salary",
// 		"Entertainment",
// 		"Dining Out",
// 		"Transportation",
// 		"Healthcare",
// 		"Insurance",
// 		"Investments",
// 		"Shopping",
// 		"Travel",
// 		"Education",
// 		"Fitness",
// 		"Gifts",
// 		"Subscriptions",
// 		"Loans",
// 		"Taxes",
// 		"Savings",
// 		"Childcare",
// 	];

// 	const quickTransferData = [
// 		{ value: 32.5, color: "primary", label: "32.5% Completed" },
// 		{ value: 20.8, color: "secondary", label: "20.8% In Progress" },
// 		{ value: 9.9, color: "warning", label: "9.9% Pending" },
// 	];

// 	// Calculate balance, income, and expenses
// 	const income = transactions
// 		.filter((t) => t.transactionType === "income")
// 		.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
// 	const expenses = transactions
// 		.filter((t) => t.transactionType === "expense")
// 		.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
// 	const balance = income - expenses;

// 	// Example data for Analytics
// 	const expenseDistribution = categories.map((category) => ({
// 		name: category,
// 		value: transactions
// 			.filter(
// 				(t) =>
// 					t.category === category && t.transactionType === "expense"
// 			)
// 			.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
// 	}));

// 	const incomeVsExpenses = [
// 		{ month: "August", income: 1200, expenses: 800 },
// 		{ month: "September", income: income, expenses: expenses },
// 	];

// 	// Fetch transactions from Excel on mount
// 	useEffect(() => {
// 		fetchTransactionsFromExcel(setTransactions).then(() =>
// 			console.log("transactions:", transactions)
// 		); // log after fetching
// 	}, []);

// 	return (
// 		<div>
// 			{/* Header */}
// 			<AppBar position="static">
// 				<Toolbar>
// 					<Typography variant="h6">Finance Manager</Typography>
// 				</Toolbar>
// 			</AppBar>

// 			<Container>
// 				{/* Main Content */}
// 				<Box my={4}>
// 					{/* Dashboard */}
// 					<Dashboard
// 						balance={balance}
// 						income={income}
// 						expenses={expenses}
// 						transactions={transactions}
// 						categories={categories}
// 						setTransactions={setTransactions}
// 					/>

// 					{/* Transaction History */}
// 					<TransactionHistory
// 						transactions={transactions}
// 						categories={categories}
// 					/>

// 					{/* Analytics */}
// 					<Analytics
// 						expenseDistribution={expenseDistribution}
// 						incomeVsExpenses={incomeVsExpenses}
// 						quickTransferData={quickTransferData}
// 					/>
// 				</Box>
// 			</Container>
// 		</div>
// 	);
// };

// export default App;

// 4: Excel

import React, { useState, useEffect } from "react";
import {
	fetchTransactionsFromExcel,
	handleAddTransaction,
	handleDownloadExcel,
} from "./utils/utils"; // Ensure correct path

const App = () => {
	const [transactions, setTransactions] = useState([]);
	const [loadTransactions, setLoadTransactions] = useState(false);
	const [newTransaction, setNewTransaction] = useState({
		id: "",
		date: "",
		category: "",
		transactionType: "",
		amount: "",
		note: "",
	});

	useEffect(() => {
		// Initial load of transactions (optional)
		const loadInitialTransactions = async () => {
			await fetchTransactionsFromExcel(setTransactions);
		};

		loadInitialTransactions();
	}, []); // Empty dependency array means this effect runs once on mount

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTransaction((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Save the new transaction to the Excel file
		handleAddTransaction(newTransaction, setNewTransaction);
		// Optionally reload the transactions
		// await fetchTransactionsFromExcel(setTransactions);
		setLoadTransactions(false); // Show updated transactions
	};

	const renderTransaction = (transaction) => (
		<div key={transaction.id}>
			<p>id: {transaction.id}</p>
			<p>Date: {transaction.date}</p> {/* Render formatted date */}
			<p>Category: {transaction.category}</p>
			<p>Type: {transaction.transactionType}</p>
			<p>Amount: {transaction.amount}</p>
			<p>Note: {transaction.note}</p>
		</div>
	);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="id"
					placeholder="Transaction ID"
					value={newTransaction.id}
					onChange={handleInputChange}
					required
				/>
				<input
					type="date"
					name="date"
					placeholder="Transaction Date"
					value={newTransaction.date}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="category"
					placeholder="Category"
					value={newTransaction.category}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="transactionType"
					placeholder="Transaction Type"
					value={newTransaction.transactionType}
					onChange={handleInputChange}
					required
				/>
				<input
					type="number"
					name="amount"
					placeholder="Amount"
					value={newTransaction.amount}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="note"
					placeholder="Note"
					value={newTransaction.note}
					onChange={handleInputChange}
				/>
				<button type="submit">Save Transaction</button>

				{/* <button onClick={handleAddTransaction}>Add Transaction</button> */}
			</form>

			{/* Button to download the updated transactions */}
			<button onClick={() => handleDownloadExcel(transactions)}>
				Download Excel
			</button>

			<button
				onClick={async () => {
					await fetchTransactionsFromExcel(setTransactions);
					setLoadTransactions(true); // Show transactions after button is clicked
				}}
			>
				Load Transactions
			</button>

			{/* Render transactions only if loadTransactions is true */}
			{loadTransactions && transactions.map(renderTransaction)}
		</div>
	);
};

export default App;
