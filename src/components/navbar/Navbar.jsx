import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Image } from "@mui/icons-material";
import {
  HomeOutlined as HomeIcon,
  PeopleOutlined as PeopleIcon,
  EventOutlined as EventIcon,
  ChatBubbleOutlineOutlined as ChatIcon,
  PaymentOutlined as PaymentIcon,
  SettingsOutlined as SettingsIcon,
  MoreVertOutlined as MoreIcon,
} from "@mui/icons-material";
import "./Navbar.scss";
import Logo from "../../assets/TestLogo.png";
import ProfileImage from "../../assets/profileIcon.png";

const navItems = [
  { id: "overview", label: "Overview", icon: <HomeIcon /> },
  { id: "patients", label: "Patients", icon: <PeopleIcon /> },
  { id: "schedule", label: "Schedule", icon: <EventIcon /> },
  { id: "messages", label: "Messages", icon: <ChatIcon /> },
  { id: "transactions", label: "Transactions", icon: <PaymentIcon /> },
];

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("patients");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <Box className="navbar" display="flex" alignItems="center" justifyContent="space-between">
      <Box className="navbar__left">
        <img src={Logo} alt="logo" />
      </Box>

      <Box className="navbar__center" display="flex" gap={2}>
        {navItems.map(({ id, label, icon }) => (
          <Box
            key={id}
            className={`nav-item ${activeNav === id ? "active" : ""}`}
            onClick={() => setActiveNav(id)}
            display="flex"
            alignItems="center"
            gap={1}
          >
            {icon} <Typography>{label}</Typography>
          </Box>
        ))}
      </Box>

      <Box className="navbar__right" display="flex" alignItems="center" gap={2}>
        <Avatar alt="User Profile" src={ProfileImage} />
        <Box className="user-info" display="flex" flexDirection="column">
          <Typography className="user-name">Dr. Jose Simmons</Typography>
          <Typography className="user-role">General Practitioner</Typography>
        </Box>
        <SettingsIcon className="icon" />
        <MoreIcon className="icon" />

        <IconButton className="menu-icon" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box className="drawer-header" display="flex" justifyContent="flex-end">
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map(({ id, label, icon }) => (
            <ListItem button key={id} onClick={() => setActiveNav(id)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
