import React from "react";
import { Container, Grid } from "@mui/material";
import IncomeExpenseChart from "./Analytics/IncomeExpenseChart";
import CategoryExpenseChart from "./Analytics/CategoryExpenseChart";
import WeeklyExpenseChart from "./Analytics/WeeklyExpenseChart";
import ExpenseDistributionByTimeline from "./Analytics/ExpenseDistributionByTimeline";
import BiggestSpendingDay from "./Analytics/BiggestSpendingDay";
import BreakdownEssentialNonEssential from "./Analytics/BreakdownEssentialNonEssential";
import ComparisonToPrevious from "./Analytics/ComparisonToPrevious";
import SpendingHabitsDayNight from "./Analytics/SpendingHabitsDayNight";
import Heatmap from "./Analytics/Heatmap";
import MonthlyTrends from "./Analytics/MonthlyTrends";
import TransactionFrequencyAnalysis from "./Analytics/TransactionFrequencyAnalysis";

const categoryData = [
	// Daily Data
	{ label: "2024-09-01", value: 100, interval: "day" },
	{ label: "2024-09-02", value: 150, interval: "day" },
	{ label: "2024-09-03", value: 200, interval: "day" },
	{ label: "2024-09-04", value: 250, interval: "day" },
	{ label: "2024-09-05", value: 120, interval: "day" },
	{ label: "2024-09-06", value: 170, interval: "day" },
	{ label: "2024-09-07", value: 130, interval: "day" },

	// Weekly Data
	{ label: "Week 1", value: 1000, interval: "week" },
	{ label: "Week 2", value: 1100, interval: "week" },
	{ label: "Week 3", value: 1200, interval: "week" },
	{ label: "Week 4", value: 900, interval: "week" },

	// Monthly Data
	{ label: "January", value: 3000, interval: "month" },
	{ label: "February", value: 3200, interval: "month" },
	{ label: "March", value: 2800, interval: "month" },
	{ label: "April", value: 4000, interval: "month" },
	{ label: "May", value: 3600, interval: "month" },
	{ label: "June", value: 3300, interval: "month" },
	{ label: "July", value: 3700, interval: "month" },
	{ label: "August", value: 4100, interval: "month" },

	// Yearly Data
	{ label: "2021", value: 50000, interval: "year" },
	{ label: "2022", value: 55000, interval: "year" },
	{ label: "2023", value: 60000, interval: "year" },
	{ label: "2024", value: 65000, interval: "year" },
];
const spendingByDay = [
	{ day: "Monday", spending: 120 },
	{ day: "Tuesday", spending: 200 },
	{ day: "Wednesday", spending: 180 },
	{ day: "Thursday", spending: 220 },
	{ day: "Friday", spending: 160 },
	{ day: "Saturday", spending: 250 },
	{ day: "Sunday", spending: 230 },
];
const comparisonData = [
	{ month: "Jan", current: 500, previous: 450 },
	{ month: "Feb", current: 550, previous: 500 },
	{ month: "Mar", current: 600, previous: 580 },
	// Add more months...
];

const essentialVsNonEssential = [
	{ category: "Essential", value: 3000 },
	{ category: "Non-Essential", value: 1500 },
];

const dayVsNightData = [
	{ period: "Day", spending: 4000 },
	{ period: "Night", spending: 3000 },
];
const isLoading = false;
const Analytics = () => {
	return (
		<Container maxWidth="lg" style={{ marginTop: "2rem" }}>
			<Grid container spacing={4}>
				{/* Income vs Expense */}
				<Grid item xs={12} md={6}>
					<IncomeExpenseChart />
				</Grid>

				{/* Expense by Category */}
				<Grid item xs={12} md={6}>
					<CategoryExpenseChart />
				</Grid>

				{/* Expense by Week */}
				<Grid item xs={12}>
					<WeeklyExpenseChart />
				</Grid>

				<Grid item xs={12}>
					<ExpenseDistributionByTimeline
						categoryData={categoryData}
					/>
				</Grid>
				<Grid item xs={12}>
					<BiggestSpendingDay
						spendingByDay={spendingByDay}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12}>
					<ComparisonToPrevious
						comparisonData={comparisonData}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12}>
					<BreakdownEssentialNonEssential
						essentialVsNonEssential={essentialVsNonEssential}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12}>
					<SpendingHabitsDayNight
						dayVsNightData={dayVsNightData}
						isLoading={isLoading}
					/>
				</Grid>

				<Grid item xs={12}>
					<Heatmap />
				</Grid>

				<Grid item xs={12}>
					<MonthlyTrends />
				</Grid>

				<Grid item xs={12}>
					<TransactionFrequencyAnalysis />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Analytics;
