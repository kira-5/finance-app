import * as React from "react";
import { Typography, Card } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import LoadingIndicator from "../LoadingIndicator";
import NoDataMessage from "../NoDataMessage";

const BreakdownEssentialNonEssential = ({
	essentialVsNonEssential = [],
	isLoading,
	message = "No data available.",
}) => (
	<Card>
		<Typography variant="h6" gutterBottom>
			Essential vs Non-Essential Spending
		</Typography>
		{isLoading ? (
			<LoadingIndicator />
		) : essentialVsNonEssential.length > 0 ? (
			<PieChart
				series={[
					{
						data: essentialVsNonEssential.map((item) => item.value),
						labels: essentialVsNonEssential.map(
							(item) => item.category
						),
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

export default BreakdownEssentialNonEssential;
