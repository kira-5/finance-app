// util.js
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid"; // If using UUIDs for unique IDs

export const handleFileUpload = (e, transactions, setTransactions) => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = (event) => {
		const data = new Uint8Array(event.target.result);
		const workbook = XLSX.read(data, { type: "array" });
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// Use UUID for unique IDs
		const loadedTransactions = jsonData.slice(1).map((row) => ({
			id: uuidv4(),
			category: row[0],
			amount: row[1],
			transactionType: row[2],
			note: row[3] || "",
			date: row[4],
		}));

		// Append new transactions to the existing state
		setTransactions((prevTransactions) => [
			...prevTransactions,
			...loadedTransactions,
		]);
	};
	reader.readAsArrayBuffer(file);
};

const parseExcelDate = (dateCell) => {
	// Check if the cell contains a timestamp
	if (typeof dateCell === "number") {
		// Handle Excel serial date number
		const utcDays = Math.floor(dateCell - 25569);
		const utcValue = utcDays * 86400; // Seconds per day
		const date = new Date(utcValue * 1000); // Convert to milliseconds
		const fractionalDay = dateCell % 1;
		date.setUTCSeconds(
			date.getUTCSeconds() + Math.round(fractionalDay * 86400)
		);
		return date;
	} else if (typeof dateCell === "string") {
		// Handle timestamp strings
		return new Date(dateCell);
	}
	return new Date();
};

export const fetchTransactionsFromExcel = async (setTransactions) => {
	try {
		const response = await fetch("/transaction.xlsx"); // Adjust path if needed

		if (!response.ok) {
			throw new Error(
				`Network response was not ok. Status: ${response.status}`
			);
		}

		const arrayBuffer = await response.arrayBuffer();
		const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
			type: "array",
		});
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		const newTransactions = jsonData.slice(1).map((row) => ({
			id: parseInt(row[0]) || uuidv4(),
			date: parseExcelDate(row[1]).toLocaleString() || "",
			category: row[2] || "",
			transactionType: row[3] || "",
			amount: parseFloat(row[4]) || 0, // Convert to number
			note: row[5] || "",
		}));

		setTransactions((prevTransactions) => [
			// ...prevTransactions,
			...newTransactions,
		]);
	} catch (error) {
		console.error("Error fetching or parsing the Excel file", error);
		alert(`Failed to fetch transactions. Error: ${error.message}`);
	}
};

export const exportTransactionsToExcel = (transactions) => {
	console.log("Export transactions", transactions);
	// Convert transactions to a format compatible with XLSX
	const ws = XLSX.utils.json_to_sheet(transactions);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Transactions");

	// Generate buffer and create download link
	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	const blob = new Blob([wbout], { type: "application/octet-stream" });
	const url = window.URL.createObjectURL(blob);

	// Create a link element and simulate a click to download the file
	const link = document.createElement("a");
	link.href = url;
	link.download = "transactions.xlsx";
	link.click();

	// Clean up URL object
	window.URL.revokeObjectURL(url);
};

export const handleDownloadExcel = (transactions) => {
	const ws = XLSX.utils.json_to_sheet(transactions);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Transactions");

	// Generate and download Excel file
	XLSX.writeFile(wb, "updated_transactions.xlsx");
};

export const handleAddTransaction = (newTransaction, setNewTransaction) => {
	setNewTransaction(() => [
		// ...prevTransactions,
		newTransaction,
	]);
	setNewTransaction({
		id: "",
		date: "",
		category: "",
		transactionType: "",
		amount: "",
		note: "",
	});
};
