import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import TransactionView from "./TransactionView";
import AddTransaction from "./AddTransaction";
import {
	exportTransactionsToExcel,
	fetchTransactionsFromExcel,
} from "../utils/utils";

const Dashboard = ({
	balance,
	income,
	expenses,
	transactions,
	categories,
	setTransactions,
}) => {
	const [showAddTransaction, setShowAddTransaction] = useState(false);

	const handleSaveTransaction = (transaction) => {
		// Ensure transactions is an array and not undefined
		if (!Array.isArray(transactions)) {
			console.error("Transactions is not an array");
			return;
		}

		const newTransaction = { ...transaction, id: transactions.length + 1 };
		setTransactions([...transactions, newTransaction]);
		setShowAddTransaction(false); // Hide the form after saving
		exportTransactionsToExcel([...transactions, newTransaction]);
	};

	const handleToggleAddTransaction = () => {
		setShowAddTransaction(!showAddTransaction);
	};
	return (
		<Box p={3}>
			{/* Header */}
			<Typography variant="h4">Dashboard</Typography>
			<Box display="flex" justifyContent="space-between" my={2}>
				<Typography variant="h6">Balance: ${balance}</Typography>
				<Typography variant="h6">Income: ${income}</Typography>
				<Typography variant="h6">Expenses: ${expenses}</Typography>
			</Box>

			{/* Quick Actions */}
			<Box mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleToggleAddTransaction}
				>
					{showAddTransaction ? "Cancel" : "+ Add Transaction"}
				</Button>
			</Box>

			{/* Conditionally render AddTransaction component */}
			{showAddTransaction && (
				<AddTransaction
					categories={categories}
					onSave={handleSaveTransaction}
				/>
			)}

			{/* Display transactions */}
			<TransactionView transactions={transactions} />
		</Box>
	);
};

export default Dashboard;
