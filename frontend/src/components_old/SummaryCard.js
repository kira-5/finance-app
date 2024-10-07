import React from "react";
import { Paper, Typography } from "@mui/material";

const SummaryCard = ({ label, value, change }) => {
	return (
		<Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
			<Typography variant="subtitle1">{label}</Typography>
			<Typography variant="h5">{value}</Typography>
			<Typography
				variant="subtitle2"
				color={change.startsWith("-") ? "error" : "success.main"}
			>
				{change}
			</Typography>
		</Paper>
	);
};

export default SummaryCard;
