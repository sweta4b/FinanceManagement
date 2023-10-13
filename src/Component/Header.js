import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getStyles = {
    textDecoration: "none",
    color: "white"
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Finance App
      </Typography>
      <Divider />
      <List>
        <NavLink
          to="/savings"
          style={{ textDecoration: "none", color: "black" }}
        >
          Savings
        </NavLink>
      </List>
      <List>
        <NavLink
          to="/expenses"
          style={{ textDecoration: "none", color: "black" }}
        >
          Expenses
        </NavLink>
      </List>
      <List>
        <NavLink
          to="/income"
          style={{ textDecoration: "none", color: "black" }}
        >
          Income
        </NavLink>
      </List>
      <List>
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          Home
        </NavLink>
      </List>
      <List>
        <NavLink
          to="/report"
          style={{ textDecoration: "none", color: "black" }}
        >
          Report
        </NavLink>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Finance App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "10px" }}>
            <NavLink to="/savings" style={getStyles}>
              Savings
            </NavLink>
            <NavLink to="/income" style={getStyles}>
              Income
            </NavLink>
            <NavLink to="/expenses" style={getStyles}>
              Expenses
            </NavLink>
            <NavLink to="/report" style={getStyles}>
              Report
            </NavLink>
            <NavLink to="/" style={getStyles}>
              Home
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}
