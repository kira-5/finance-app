import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import Table from "./Table";
import Stacks from "./Stack";
import Graph from "./Graph";

const Home = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDataFromAPI = async () => {
			try {
				const result = await fetchData("/transactions"); // Adjust this to your API endpoint
				setData(result.data);
			} catch (err) {
				console.error("Error fetching data", err);
			} finally {
				setLoading(false);
			}
		};

		fetchDataFromAPI();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>No data available</div>;
	}

	return (
		<div>
			<h1>API Data</h1>
			<Table data={data} />
			{/* <Stacks data={data} /> */}
			<Graph data={data} />
		</div>
	);
};

export default Home;
