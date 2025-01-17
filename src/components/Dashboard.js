// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Container,
} from '@mui/material';
import {
  Logout,
  Person,
  Work,
  Assignment,
  CalendarToday,
  Group,
  Timeline,
  Forum,
  Menu,
  Home,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import CSS module

const drawerWidth = 240;

const sections = [
  { text: 'Profile', icon: <Person />, path: 'profile' },
  { text: 'Your Works', icon: <Work />, path: 'your-works' },
  { text: 'ToDo List', icon: <Assignment />, path: 'todo' },
  { text: 'Mind Map', icon: <Assignment />, path: 'mind-map' },
  { text: 'Habit Tracking', icon: <CalendarToday />, path: 'habit-tracking' },
  { text: 'Community', icon: <Group />, path: 'community' },
  { text: 'Progress or Milestones', icon: <Timeline />, path: 'progress' },
  { text: 'Sessions and Collaborations', icon: <Forum />, path: 'sessions' },
];

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good Morning!';
  if (currentHour < 18) return 'Good Afternoon!';
  return 'Good Evening!';
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(getGreeting());
  const [open, setOpen] = useState(true); // Sidebar toggle state

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 1000 * 60); // Update greeting every minute

    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = () => setOpen(!open); // Toggle sidebar visibility

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open ? `${drawerWidth}px` : 0,
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          transition: 'width 0.3s ease, margin 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
          <IconButton sx={{ color: 'inherit' }}>
            <Avatar />
          </IconButton>
          <IconButton sx={{ color: 'inherit' }} onClick={() => navigate('/')}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar with Logo */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff', // Removed grey background
            transition: 'width 0.3s ease',
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate('/')} sx={{ mx: 'auto' }}>
            <Home sx={{ fontSize: 40, color: '#6c63ff' }} />
          </IconButton>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mx: 'auto' }}>
            <DashboardIcon sx={{ fontSize: 40, color: '#6c63ff' }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {sections.map((section) => (
            <Link
              to={section.path}
              key={section.text}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem disablePadding>
                <ListItemButton selected={location.pathname.includes(section.path)}>
                  <ListItemIcon>{section.icon}</ListItemIcon>
                  <ListItemText primary={section.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin-left 0.3s ease',
          ml: open ? `0px` : 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 3,
        }}
      >
        {location.pathname === '/dashboard' && (
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, color: '#6c63ff' }}>
              {greeting}
            </Typography>
          </Container>
        )}
        <Outlet /> {/* Render nested route components */}
      </Box>
    </Box>
  );
};

export default Dashboard;
