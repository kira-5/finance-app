import React from "react";
import {
	Table as MUITable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const TransactionsTable = ({ data }) => {
	// Get the keys from the first object to generate the headers
	const headers = data.length > 0 ? Object.keys(data[0]) : [];

	return (
		<TableContainer component={Paper}>
			<MUITable>
				<TableHead>
					<TableRow>
						{headers.map((header) => (
							<TableCell key={header}>
								{header.replace("_", " ").toUpperCase()}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{Object.values(row).map((value, colIndex) => (
								<TableCell key={colIndex}>
									{value !== null ? value.toString() : "N/A"}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</MUITable>
		</TableContainer>
	);
};

export default TransactionsTable;
