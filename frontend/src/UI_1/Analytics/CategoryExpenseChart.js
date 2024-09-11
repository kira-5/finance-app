import React from "react";
import { Paper, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

// Sample data
const categoryData = [
	{ name: "Groceries", value: 400 },
	{ name: "Rent", value: 1000 },
	{ name: "Utilities", value: 300 },
	{ name: "Entertainment", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CategoryExpenseChart = () => {
	return (
		<Paper elevation={3} style={{ padding: "1rem" }}>
			<Typography variant="h6" gutterBottom>
				Expense by Category
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={categoryData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
					>
						{categoryData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default CategoryExpenseChart;
