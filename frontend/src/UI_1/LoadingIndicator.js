import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		height={300}
	>
		<CircularProgress />
	</Box>
);

export default LoadingIndicator;
