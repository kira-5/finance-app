import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const Assets = () => {
	return (
		<Paper elevation={3} sx={{ padding: 2 }}>
			<Typography variant="h6">Your Assets</Typography>
			<Typography variant="h4" sx={{ marginBottom: 2 }}>
				$35,445.00
			</Typography>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box
					sx={{
						width: "10%",
						backgroundColor: "#cfe8fc",
						height: 100,
					}}
				/>
				<Box
					sx={{
						width: "10%",
						backgroundColor: "#cfe8fc",
						height: 150,
					}}
				/>
				<Box
					sx={{
						width: "10%",
						backgroundColor: "#cfe8fc",
						height: 80,
					}}
				/>
				<Box
					sx={{
						width: "10%",
						backgroundColor: "#cfe8fc",
						height: 120,
					}}
				/>
				{/* More bars */}
			</Box>
		</Paper>
	);
};

export default Assets;
