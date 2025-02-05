import {
    Backup,
    CloudSync,
    Email,
    Language,
    Notifications,
    Security,
    Storage,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

const Settings = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    darkMode: mode === 'dark',
    language: 'English',
    dataRetention: '12 months',
    syncFrequency: 'Daily',
  });

  const handleSettingChange = (setting) => (event) => {
    if (setting === 'darkMode') {
      toggleTheme();
    }
    setSettings({ ...settings, [setting]: event.target.checked });
  };

  const handleBackup = () => {
    setBackupDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            General Settings
          </Typography>
        </Grid>

        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText 
                  primary="Email Notifications"
                  secondary="Receive case updates via email"
                />
                <Switch
                  edge="end"
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange('emailNotifications')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  primary="SMS Notifications"
                  secondary="Receive urgent updates via SMS"
                />
                <Switch
                  edge="end"
                  checked={settings.smsNotifications}
                  onChange={handleSettingChange('smsNotifications')}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Toggle dark/light theme"
                />
                <Switch
                  edge="end"
                  checked={settings.darkMode}
                  onChange={handleSettingChange('darkMode')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText
                  primary="Language"
                  secondary={settings.language}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Data Management */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Data Management
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText
                  primary="Data Retention"
                  secondary={`Keep data for ${settings.dataRetention}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Backup />
                </ListItemIcon>
                <ListItemText
                  primary="Automatic Backup"
                  secondary="Backup your data daily"
                />
                <Switch
                  edge="end"
                  checked={settings.autoBackup}
                  onChange={handleSettingChange('autoBackup')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CloudSync />
                </ListItemIcon>
                <ListItemText
                  primary="Manual Backup"
                  secondary="Create a backup of your data now"
                />
                <Button
                  variant="outlined"
                  onClick={handleBackup}
                  sx={{ ml: 2 }}
                >
                  Backup Now
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Backup Dialog */}
      <Dialog
        open={backupDialogOpen}
        onClose={() => setBackupDialogOpen(false)}
      >
        <DialogTitle>Create Backup</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            This will create a backup of all your data. The process may take a few minutes.
          </Typography>
          <TextField
            fullWidth
            label="Backup Name"
            defaultValue={`Backup_${new Date().toISOString().split('T')[0]}`}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackupDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Handle backup
              setBackupDialogOpen(false);
            }}
          >
            Start Backup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 