import React, { useState } from "react";
import {
	Box,
	Typography,
	Paper,
	CircularProgress,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { styled } from "@mui/material/styles";

// Styled components_old
const Card = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[4],
}));

// const Title = styled(Typography)(({ theme }) => ({
// 	marginBottom: theme.spacing(3),
// 	fontWeight: theme.typography.fontWeightBold,
// 	color: theme.palette.text.primary,
// 	textAlign: "center",
// }));

const ExpenseDistributionByWeek = ({ categoryData = [], isLoading }) => {
	const [timeInterval, setTimeInterval] = useState("week");
	// Handle time interval change
	const handleTimeIntervalChange = (event) => {
		setTimeInterval(event.target.value);
	};

	// Get filtered data based on selected time interval
	const filteredCategoryData = React.useMemo(() => {
		switch (timeInterval) {
			case "day":
				return categoryData.filter((item) => item.interval === "day");
			case "week":
				return categoryData.filter((item) => item.interval === "week");
			case "year":
				return categoryData.filter((item) => item.interval === "year");
			default:
				return categoryData.filter((item) => item.interval === "month");
		}
	}, [timeInterval, categoryData]);

	return (
		<Card>
			<Typography variant="h6" gutterBottom>
				Expense Distribution by {timeInterval}
			</Typography>

			{/* Time Interval Selector */}
			<FormControl variant="outlined" fullWidth margin="normal">
				<InputLabel>Time Interval</InputLabel>
				<Select
					value={timeInterval}
					onChange={handleTimeIntervalChange}
					label="Time Interval"
				>
					<MenuItem value="day">Daily</MenuItem>
					<MenuItem value="week">Weekly</MenuItem>
					<MenuItem value="month">Monthly</MenuItem>
					<MenuItem value="year">Yearly</MenuItem>
				</Select>
			</FormControl>

			{isLoading ? (
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					height={300}
				>
					<CircularProgress />
					<Typography variant="body2" color="textSecondary" mt={2}>
						Loading...
					</Typography>
				</Box>
			) : filteredCategoryData.length > 0 ? (
				<LineChart
					series={[
						{
							data: filteredCategoryData.map(
								(item) => item.value
							),
							label: `Expenses by ${timeInterval}`,
						},
					]}
					height={290}
					xAxis={[
						{
							data: filteredCategoryData.map(
								(item) => item.label
							),
							scaleType: "band",
						},
					]}
					margin={{
						top: 10,
						bottom: 30,
						left: 40,
						right: 10,
					}}
				/>
			) : (
				<Typography variant="body2" color="textSecondary">
					No data available for {timeInterval}.
				</Typography>
			)}
		</Card>
	);
};

export default ExpenseDistributionByWeek;
