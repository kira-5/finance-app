import React from "react";
import { Paper, Typography } from "@mui/material";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

// Sample data
const weeklyExpenseData = [
	{ week: "Week 1", expense: 500 },
	{ week: "Week 2", expense: 700 },
	{ week: "Week 3", expense: 800 },
	{ week: "Week 4", expense: 600 },
];

const WeeklyExpenseChart = () => {
	return (
		<Paper elevation={3} style={{ padding: "1rem" }}>
			<Typography variant="h6" gutterBottom>
				Expense Trends (Weekly)
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={weeklyExpenseData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="week" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="expense" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default WeeklyExpenseChart;
