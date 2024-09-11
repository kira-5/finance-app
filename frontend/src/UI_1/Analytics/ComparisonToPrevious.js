import * as React from "react";
import { Typography, Card } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import LoadingIndicator from "../LoadingIndicator";
import NoDataMessage from "../NoDataMessage";

const ComparisonToPrevious = ({
	comparisonData = [],
	isLoading,
	message = "No data available.",
}) => (
	<Card>
		<Typography variant="h6" gutterBottom>
			Comparison to Previous Month/Year
		</Typography>
		{isLoading ? (
			<LoadingIndicator />
		) : comparisonData.length > 0 ? (
			<LineChart
				series={[
					{
						data: comparisonData.map((item) => item.current),
						label: "This Year",
					},
					{
						data: comparisonData.map((item) => item.previous),
						label: "Last Year",
					},
				]}
				xAxis={[
					{
						data: comparisonData.map((item) => item.month),
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

export default ComparisonToPrevious;
