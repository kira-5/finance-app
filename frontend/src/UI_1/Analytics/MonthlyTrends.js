import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const monthlyTrendsData = [
	{ month: "January", value: 500 },
	{ month: "February", value: 600 },
	{ month: "March", value: 700 },
	// Add more months as needed
];

const MonthlyTrends = () => (
	<Paper elevation={3} style={{ padding: "1rem" }}>
		<Typography variant="h6" gutterBottom>
			Monthly Spending Trends
		</Typography>
		<Box display="flex" justifyContent="center">
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={monthlyTrendsData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</Box>
	</Paper>
);

export default MonthlyTrends;
