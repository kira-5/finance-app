import React from "react";
import { Container, Grid } from "@mui/material";
import Header from "./Header";
import SummaryCard from "./SummaryCard";
import Assets from "./Assets";
import QuickTransfer from "./QuickTransfer";

const Dashboard = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				maxWidth: {
					xs: "100%", // for small screens
					sm: "100%",
					md: "100%",
					lg: "100%", // default Material UI lg behavior
					xl: "1700px", // custom maxWidth for screens >= 1200px
				},
			}}
		>
			<Header />
			<Grid container spacing={3} mt={3}>
				<Grid item xs={12} md={3}>
					<SummaryCard
						label="Total Income"
						value="$9500 USD"
						change="2.3%"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<SummaryCard
						label="Total Spending"
						value="$3500 USD"
						change="-2.3%"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<SummaryCard
						label="Spending Goal"
						value="$8500 USD"
						change="-2.3%"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<SummaryCard
						label="Total Transactions"
						value="$18000 USD"
						change="2.3%"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3} mt={3}>
				<Grid item xs={12} md={8}>
					<Assets />
				</Grid>
				<Grid item xs={12} md={4}>
					<QuickTransfer />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Dashboard;
