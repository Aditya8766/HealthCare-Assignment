import React, { useState } from "react";
import { Avatar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
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
    <nav className="navbar">
      <div className="navbar__left">
        <img src={Logo} alt="logo" />
      </div>

      <div className="navbar__center">
        {navItems.map(({ id, label, icon }) => (
          <div
            key={id}
            className={`nav-item ${activeNav === id ? "active" : ""}`}
            onClick={() => setActiveNav(id)}
          >
            {icon} <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="navbar__right">
        <Avatar alt="User Profile" src={ProfileImage} />
        <div className="user-info">
          <span className="user-name">Dr. Jose Simmons</span>
          <span className="user-role">General Practitioner</span>
        </div>
        <SettingsIcon className="icon" />
        <MoreIcon className="icon" />

        <IconButton className="menu-icon" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-header">
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {navItems.map(({ id, label, icon }) => (
            <ListItem button key={id} onClick={() => setActiveNav(id)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
};

export default Navbar;
