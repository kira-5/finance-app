import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const transactionFrequencyData = [
	{ range: "$0 - $50", count: 50 },
	{ range: "$51 - $100", count: 30 },
	{ range: "$101 - $200", count: 20 },
	{ range: "$201 - $500", count: 15 },
	{ range: "$500+", count: 5 },
];

const TransactionFrequencyAnalysis = () => (
	<Paper elevation={3} style={{ padding: "1rem" }}>
		<Typography variant="h6" gutterBottom>
			Transaction Frequency Analysis
		</Typography>
		<Box display="flex" justifyContent="center">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={transactionFrequencyData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="range" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="count" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	</Paper>
);

export default TransactionFrequencyAnalysis;
