import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static" color="default" variant="elevation">
			<Toolbar>
				{/* Logo / Title */}
				<Typography variant="h6" sx={{ flexGrow: { xs: 1, sm: 0 } }}>
					Gojek
				</Typography>

				{/* Desktop Menu */}
				<Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1 }}>
					<Button color="inherit">Dashboard</Button>
					<Button color="inherit">Accounts</Button>
					<Button color="inherit">Transaction</Button>
					<Button color="inherit">Payment</Button>
					<Button color="inherit">Cards</Button>
				</Box>

				{/* Create New Button */}
				<Box
					sx={{
						display: { xs: "none", sm: "flex" },
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						color="primary"
						sx={{ marginLeft: 2 }}
					>
						+ Create New
					</Button>
				</Box>

				{/* Mobile Menu (Hamburger Icon) */}
				<IconButton
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ display: { xs: "flex", sm: "none" } }}
					onClick={handleMenuClick}
				>
					<MenuIcon />
				</IconButton>

				{/* Mobile Dropdown Menu */}
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					keepMounted
				>
					<MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
					<MenuItem onClick={handleMenuClose}>Accounts</MenuItem>
					<MenuItem onClick={handleMenuClose}>Transaction</MenuItem>
					<MenuItem onClick={handleMenuClose}>Payment</MenuItem>
					<MenuItem onClick={handleMenuClose}>Cards</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button variant="contained" color="primary" fullWidth>
							+ Create New
						</Button>
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
