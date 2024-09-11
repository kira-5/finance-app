import * as React from "react";
import { Typography, Card } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import LoadingIndicator from "../LoadingIndicator";
import NoDataMessage from "../NoDataMessage";

const SpendingHabitsDayNight = ({
	dayVsNightData,
	isLoading,
	message = "No data available.",
}) => (
	<Card>
		<Typography variant="h6" gutterBottom>
			Spending Habits (Day vs Night)
		</Typography>
		{isLoading ? (
			<LoadingIndicator />
		) : dayVsNightData.length > 0 ? (
			<BarChart
				series={[{ data: dayVsNightData.map((item) => item.spending) }]}
				xAxis={[
					{
						data: dayVsNightData.map((item) => item.period),
						scaleType: "band",
					},
				]}
				height={300}
				margin={{ top: 20, bottom: 40, left: 40, right: 20 }}
			/>
		) : (
			<NoDataMessage message={message} />
		)}
	</Card>
);

export default SpendingHabitsDayNight;
