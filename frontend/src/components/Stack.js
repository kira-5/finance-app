import React from "react";
import {
	Stack,
	Typography,
	Divider,
	Box,
	Paper,
	Container,
} from "@mui/material";

const Stacks = ({ data }) => {
	return (
		<Container maxWidth="md">
			<Stack spacing={2}>
				{data.map((transaction) => (
					<Paper
						key={transaction.id}
						elevation={2}
						sx={{ padding: 2 }}
					>
						<Stack
							direction="row"
							spacing={3}
							justifyContent="space-between"
							alignItems="center"
							sx={{
								backgroundColor: "#f5f5f5",
								padding: "16px",
								borderRadius: "8px",
							}}
						>
							{/* Amount */}
							<Box>
								<Typography variant="body1" fontWeight="bold">
									Amount
								</Typography>
								<Typography variant="body2">
									${transaction.amount}
								</Typography>
							</Box>

							{/* Category */}
							<Box>
								<Typography variant="body1" fontWeight="bold">
									Category
								</Typography>
								<Typography variant="body2">
									{transaction.category}
								</Typography>
							</Box>

							{/* Tag */}
							<Box>
								<Typography variant="body1" fontWeight="bold">
									Tag
								</Typography>
								<Typography variant="body2">
									{transaction.tag}
								</Typography>
							</Box>
						</Stack>
						{/* Optional Divider between each transaction */}
						<Divider sx={{ marginTop: "16px" }} />
					</Paper>
				))}
			</Stack>
		</Container>
	);
};

export default Stacks;
