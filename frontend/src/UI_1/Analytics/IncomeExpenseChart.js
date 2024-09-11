import React from "react";
import { Paper, Typography } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

// Sample data
const incomeExpenseData = [
	{ name: "Jan", income: 4000, expense: 2400 },
	{ name: "Feb", income: 3000, expense: 1398 },
	{ name: "Mar", income: 5000, expense: 4300 },
];

const IncomeExpenseChart = () => {
	return (
		<Paper elevation={3} style={{ padding: "1rem" }}>
			<Typography variant="h6" gutterBottom>
				Income vs Expense
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={incomeExpenseData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="income" fill="#82ca9d" />
					<Bar dataKey="expense" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default IncomeExpenseChart;
