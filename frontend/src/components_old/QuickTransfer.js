import React from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";

const QuickTransfer = () => {
	return (
		<Paper elevation={3} sx={{ padding: 2 }}>
			<Typography variant="h6">Quick Transfer</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					marginTop: 2,
				}}
			>
				<Box sx={{ textAlign: "center" }}>
					<CircularProgress
						variant="determinate"
						value={32.5}
						size={80}
					/>
					<Typography variant="subtitle1">32.5% Completed</Typography>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					<CircularProgress
						variant="determinate"
						value={20.8}
						size={80}
						color="secondary"
					/>
					<Typography variant="subtitle1">
						20.8% In Progress
					</Typography>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					<CircularProgress
						variant="determinate"
						value={9.9}
						size={80}
						color="warning"
					/>
					<Typography variant="subtitle1">9.9% Pending</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default QuickTransfer;
