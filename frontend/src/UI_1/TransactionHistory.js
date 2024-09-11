import React, { useState, useEffect } from "react";
import {
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Divider,
	TextField,
	MenuItem,
	FormControl,
	Select,
	Button,
	InputLabel,
	IconButton,
} from "@mui/material";
import {
	ArrowUpward,
	ArrowDownward,
	FilterList,
	Clear,
} from "@mui/icons-material";

const TransactionHistory = ({ transactions, categories }) => {
	const [filteredCategory, setFilteredCategory] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [filteredTransactionType, setFilteredTransactionType] = useState(""); // New state for transaction type
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);
	const [isFilterApplied, setIsFilterApplied] = useState(false); // State to enable or disable Apply button

	useEffect(() => {
		// Check if any of the filter fields are filled
		if (
			filteredCategory ||
			startDate ||
			endDate ||
			filteredTransactionType
		) {
			setIsFilterApplied(true);
		} else {
			setIsFilterApplied(false);
		}
	}, [filteredCategory, startDate, endDate, filteredTransactionType]);

	const handleFilter = () => {
		let filtered = [...transactions];

		// Filter by category if selected
		if (filteredCategory) {
			filtered = filtered.filter(
				(transaction) => transaction.category === filteredCategory
			);
		}

		// Filter by date range if selected
		if (startDate) {
			filtered = filtered.filter(
				(transaction) =>
					new Date(transaction.date) >= new Date(startDate)
			);
		}
		if (endDate) {
			filtered = filtered.filter(
				(transaction) => new Date(transaction.date) <= new Date(endDate)
			);
		}

		// Filter by transaction type (income/expense) if selected
		if (filteredTransactionType) {
			filtered = filtered.filter(
				(transaction) =>
					transaction.transactionType === filteredTransactionType
			);
		}

		setFilteredTransactions(filtered);
	};

	const handleReset = () => {
		setFilteredCategory("");
		setStartDate("");
		setEndDate("");
		setFilteredTransactionType(""); // Reset transaction type filter
		setFilteredTransactions(transactions);
	};

	return (
		<Box my={4} px={2}>
			<Typography
				variant="h5"
				gutterBottom
				align="center"
				sx={{ fontWeight: "bold" }}
			>
				Transaction History
			</Typography>

			{/* Filters */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				my={2}
				gap={2}
			>
				{/* Category Filter */}
				<FormControl fullWidth>
					<InputLabel id="category-filter-label">Category</InputLabel>
					<Select
						labelId="category-filter-label"
						value={filteredCategory}
						onChange={(e) => setFilteredCategory(e.target.value)}
						label="Category"
						startAdornment={<FilterList />}
					>
						<MenuItem value="">
							<em>All Categories</em>
						</MenuItem>
						{categories.map((category, index) => (
							<MenuItem key={index} value={category}>
								{category}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* Transaction Type Filter (Income/Expense) */}
				<FormControl fullWidth>
					<InputLabel id="transaction-type-filter-label">
						Transaction Type
					</InputLabel>
					<Select
						labelId="transaction-type-filter-label"
						value={filteredTransactionType}
						onChange={(e) =>
							setFilteredTransactionType(e.target.value)
						}
						label="Transaction Type"
						startAdornment={<FilterList />}
					>
						<MenuItem value="">
							<em>All Types</em>
						</MenuItem>
						<MenuItem value="income">Income</MenuItem>
						<MenuItem value="expense">Expense</MenuItem>
					</Select>
				</FormControl>

				{/* Start Date Filter */}
				<TextField
					label="Start Date"
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>

				{/* End Date Filter */}
				<TextField
					label="End Date"
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>

				{/* Apply Filter Button */}
				<Button
					variant="contained"
					color="primary"
					onClick={handleFilter}
					fullWidth
					disabled={!isFilterApplied} // Enable/Disable based on filter state
				>
					Apply
				</Button>

				{/* Clear Filters Button */}
				<IconButton
					onClick={handleReset}
					color="secondary"
					title="Clear Filters"
				>
					<Clear />
				</IconButton>
			</Box>

			{/* Transactions List
			<Grid container spacing={3}>
				{filteredTransactions.map((transaction) => (
					<Grid item xs={12} sm={6} md={4} key={transaction.id}>
						<Card
							sx={{
								backgroundColor:
									transaction.transactionType === "income"
										? "#e0f7fa"
										: "#ffebee",
								boxShadow: 3,
								borderRadius: "12px",
							}}
						>
							<CardContent>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
											color:
												transaction.transactionType ===
												"income"
													? "#00796b"
													: "#d32f2f",
										}}
									>
										{transaction.transactionType ===
										"income" ? (
											<ArrowUpward
												sx={{ color: "#00796b" }}
											/>
										) : (
											<ArrowDownward
												sx={{ color: "#d32f2f" }}
											/>
										)}
										${transaction.amount.toFixed(2)}
									</Typography>
								</Box>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{transaction.category}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{transaction.date}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{filteredTransactions.length === 0 && (
				<Typography variant="body1" align="center" my={4}>
					No transactions found.
				</Typography>
			)} */}

			{/* Transactions List */}
			<List>
				{filteredTransactions.length > 0 ? (
					filteredTransactions.map((transaction) => (
						<React.Fragment key={transaction.id}>
							<ListItem>
								<ListItemIcon>
									{transaction.transactionType ===
									"income" ? (
										<ArrowUpward
											sx={{ color: "#00796b" }}
										/>
									) : (
										<ArrowDownward
											sx={{ color: "#d32f2f" }}
										/>
									)}
								</ListItemIcon>
								<ListItemText
									primary={`$${transaction.amount.toFixed(
										2
									)}`}
									secondary={`${transaction.category} • ${transaction.date}`}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
					))
				) : (
					<Typography variant="body1" align="center" my={4}>
						No transactions found.
					</Typography>
				)}
			</List>
		</Box>
	);
};

export default TransactionHistory;
