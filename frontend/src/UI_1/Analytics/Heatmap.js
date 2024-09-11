import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

// Sample data for the heatmap
const data = [
	{ day: "Monday", value: 300 },
	{ day: "Tuesday", value: 500 },
	{ day: "Wednesday", value: 200 },
	{ day: "Thursday", value: 400 },
	{ day: "Friday", value: 100 },
	{ day: "Saturday", value: 150 },
	{ day: "Sunday", value: 350 },
	// Add more data points as needed
];

const Heatmap = () => (
	<Paper elevation={3} style={{ padding: "1rem" }}>
		<Typography variant="h6" gutterBottom>
			Spending Patterns Heatmap
		</Typography>
		<Box display="flex" justifyContent="center">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="day" />
					<YAxis />
					<Tooltip />
					<Bar
						dataKey="value"
						fill="#8884d8"
						radius={[10, 10, 0, 0]} // Rounded corners for bars
						barSize={20}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	</Paper>
);

export default Heatmap;
