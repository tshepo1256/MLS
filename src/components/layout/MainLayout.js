import {
    DarkMode,
    ExpandLess, ExpandMore,
    LightMode,
    Menu as MenuIcon,
    Notifications,
    Search
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationConfig } from '../../config/navigation';
import { useThemeContext } from '../../context/ThemeContext';
import Breadcrumbs from '../common/Breadcrumbs';
import PageTransition from '../common/PageTransition';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { toggleTheme, mode } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenus, setOpenMenus] = useState({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path, hasChildren) => {
    if (hasChildren) {
      setOpenMenus(prev => ({
        ...prev,
        [path]: !prev[path]
      }));
    } else {
      navigate(path);
    }
  };

  const isSelected = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderNavItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.path];
    const selected = isSelected(item.path);

    return (
      <React.Fragment key={item.path}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleMenuClick(item.path, hasChildren)}
            selected={selected}
            sx={{
              pl: 2,
              '&.Mui-selected': {
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemIcon>
              {item.icon && <item.icon color={selected ? 'primary' : 'inherit'} />}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItemButton
                  key={child.path}
                  onClick={() => navigate(child.path)}
                  selected={isSelected(child.path)}
                  sx={{
                    pl: 4,
                    '&.Mui-selected': {
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                  }}
                >
                  <ListItemText primary={child.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Search sx={{ mr: 1 }} />
              <Typography variant="body1">
                Quick Search (Press / to focus)
              </Typography>
            </Box>
          </Box>

          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ ml: 2 }}
          >
            <Avatar alt="User Profile" src="/path-to-avatar.jpg" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('/logout')}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box sx={{ 
            p: 2, 
            textAlign: 'center', 
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb: 2 
          }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              MLS
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Case Management
            </Typography>
          </Box>
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {navigationConfig.map(renderNavItem)}
            </List>
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Box sx={{ 
            p: 2, 
            textAlign: 'center', 
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb: 2 
          }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              MLS
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Case Management
            </Typography>
          </Box>
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {navigationConfig.map(renderNavItem)}
            </List>
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          backgroundColor: 'background.default',
        }}
      >
        <Breadcrumbs />
        <PageTransition>
          {children}
        </PageTransition>
      </Box>
    </Box>
  );
};

export default MainLayout; 