import React, { useState } from "react";
import {
	Box,
	Typography,
	MenuItem,
	Select,
	CircularProgress,
	FormControl,
	InputLabel,
} from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { styled } from "@mui/material/styles";

const FilterSection = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(3),
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
}));

const ChartContainer = styled(Box)(({ theme }) => ({
	height: 300,
}));

const FilterChart = ({ data = [], isLoading }) => {
	// Default to empty array if data is not provided
	const [category, setCategory] = useState("");
	const [dateRange, setDateRange] = useState("");
	const [chartType, setChartType] = useState("bar");

	const handleCategoryChange = (event) => setCategory(event.target.value);
	const handleDateRangeChange = (event) => setDateRange(event.target.value);
	const handleChartTypeChange = (event) => setChartType(event.target.value);

	// Filtered data based on category and dateRange (for demonstration purposes)
	const filteredData = data.filter(
		(item) =>
			(!category || item.category === category) &&
			(!dateRange || item.dateRange === dateRange)
	);

	return (
		<Box>
			<FilterSection>
				<FormControl>
					<InputLabel>Category</InputLabel>
					<Select
						value={category}
						onChange={handleCategoryChange}
						label="Category"
					>
						<MenuItem value="">All</MenuItem>
						<MenuItem value="Category1">Category1</MenuItem>
						<MenuItem value="Category2">Category2</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel>Date Range</InputLabel>
					<Select
						value={dateRange}
						onChange={handleDateRangeChange}
						label="Date Range"
					>
						<MenuItem value="">All Time</MenuItem>
						<MenuItem value="Last30Days">Last 30 Days</MenuItem>
						<MenuItem value="Last6Months">Last 6 Months</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel>Chart Type</InputLabel>
					<Select
						value={chartType}
						onChange={handleChartTypeChange}
						label="Chart Type"
					>
						<MenuItem value="bar">Bar Chart</MenuItem>
						<MenuItem value="line">Line Chart</MenuItem>
						<MenuItem value="pie">Pie Chart</MenuItem>
					</Select>
				</FormControl>
			</FilterSection>

			<ChartContainer>
				{isLoading ? (
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						height="100%"
					>
						<CircularProgress />
						<Typography
							variant="body2"
							color="textSecondary"
							mt={2}
						>
							Loading...
						</Typography>
					</Box>
				) : chartType === "bar" ? (
					<BarChart
						data={filteredData}
						height={290}
						margin={{
							top: 10,
							bottom: 30,
							left: 40,
							right: 10,
						}}
					/>
				) : chartType === "line" ? (
					<LineChart
						data={filteredData}
						height={290}
						margin={{
							top: 10,
							bottom: 30,
							left: 40,
							right: 10,
						}}
					/>
				) : (
					<PieChart data={filteredData} height={290} />
				)}
			</ChartContainer>
		</Box>
	);
};

export default FilterChart;
