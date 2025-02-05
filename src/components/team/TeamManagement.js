import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  WorkOutline as WorkIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const mockTeamMembers = [
  {
    id: 1,
    name: 'Emma Wilson',
    role: 'Associate Attorney',
    email: 'emma.wilson@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=FF69B4&color=fff',
    permissions: ['case_management', 'document_access', 'client_communication'],
    currentCases: 5,
    taskCompletion: 92,
  },
  {
    id: 2,
    name: 'James Parker',
    role: 'Legal Assistant',
    email: 'james.parker@example.com',
    avatar: 'https://ui-avatars.com/api/?name=James+Parker&background=9370DB&color=fff',
    permissions: ['document_access', 'calendar_management'],
    currentCases: 3,
    taskCompletion: 88,
  },
];

const TeamManagement = ({ section = 'overview' }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const renderTeamMembers = () => (
    <List>
      {mockTeamMembers.map((member) => (
        <Card key={member.id} sx={{ mb: 2 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={member.avatar} alt={member.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">{member.name}</Typography>
                  <Chip label={member.role} size="small" color="primary" />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {member.permissions.map((permission) => (
                      <Chip
                        key={permission}
                        label={permission.replace('_', ' ')}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {member.currentCases}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Active Cases
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="success.main">
                  {member.taskCompletion}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Task Completion
                </Typography>
              </Box>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </ListItem>
        </Card>
      ))}
    </List>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Team Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Add Team Member
        </Button>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab icon={<PersonIcon />} label="Team Members" />
        <Tab icon={<SecurityIcon />} label="Roles & Permissions" />
        <Tab icon={<WorkIcon />} label="Work Allocation" />
        <Tab icon={<AssessmentIcon />} label="Performance" />
      </Tabs>

      {renderTeamMembers()}

      {/* Member Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Permissions</MenuItem>
        <MenuItem onClick={handleMenuClose}>Assign Tasks</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Performance</MenuItem>
      </Menu>

      {/* Add Member Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role">
                  <MenuItem value="attorney">Attorney</MenuItem>
                  <MenuItem value="paralegal">Paralegal</MenuItem>
                  <MenuItem value="legal_assistant">Legal Assistant</MenuItem>
                  <MenuItem value="secretary">Secretary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Access Level</InputLabel>
                <Select label="Access Level">
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="limited">Limited</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManagement; 