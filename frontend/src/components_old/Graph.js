import React, { useMemo } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

// Example data (transactions grouped by category)
const data = [
	{ category: "Groceries", count: 9 },
	{ category: "Entertainment", count: 4 },
	{ category: "Utilities", count: 2 },
	{ category: "Transport", count: 3 },
];

const Graph = () => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="category" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="count" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Graph;
