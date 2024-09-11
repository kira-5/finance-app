import { Typography } from "@mui/material";

const NoDataMessage = ({ message = "No data available." }) => (
	<Typography variant="body2" color="textSecondary">
		{message}
	</Typography>
);

export default NoDataMessage;
