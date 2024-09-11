import * as React from "react";
import { Typography, Card } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import LoadingIndicator from "../LoadingIndicator";
import NoDataMessage from "../NoDataMessage";

const BiggestSpendingDay = ({
	spendingByDay = [],
	isLoading,
	message = "No data available.",
}) => (
	<Card>
		<Typography variant="h6" gutterBottom>
			Biggest Spending Day
		</Typography>
		{isLoading ? (
			<LoadingIndicator />
		) : spendingByDay.length > 0 ? (
			<BarChart
				series={[{ data: spendingByDay.map((item) => item.spending) }]}
				xAxis={[
					{
						data: spendingByDay.map((item) => item.day),
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

export default BiggestSpendingDay;
