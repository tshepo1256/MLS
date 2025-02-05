import {
    Edit,
    Key,
    PhotoCamera,
    Security,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+27 123 456 789',
    position: 'Senior Attorney',
    barNumber: 'BAR123456',
    firm: 'Legal Eagles Attorneys',
    address: '123 Law Street, Pretoria',
    specialization: 'Civil Litigation',
  });

  const handleProfileUpdate = () => {
    // Handle profile update
    setEditMode(false);
  };

  const handlePasswordChange = () => {
    // Handle password change
    setPasswordDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src="/path-to-profile-image.jpg"
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: -8,
                  backgroundColor: 'white',
                }}
                size="small"
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="h5" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {profileData.position}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Professional Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Professional Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bar Number"
                  value={profileData.barNumber}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, barNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Specialization"
                  value={profileData.specialization}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Law Firm"
                  value={profileData.firm}
                  disabled={!editMode}
                  onChange={(e) => setProfileData({ ...profileData, firm: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Office Address"
                  value={profileData.address}
                  disabled={!editMode}
                  multiline
                  rows={2}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Change Password"
                  secondary="Update your login password"
                />
                <Button
                  startIcon={<Key />}
                  onClick={() => setPasswordDialog(true)}
                >
                  Change Password
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <Button
                  startIcon={<Security />}
                >
                  Enable 2FA
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        {editMode && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleProfileUpdate}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Password Change Dialog */}
      <Dialog
        open={passwordDialog}
        onClose={() => setPasswordDialog(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordChange}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile; 