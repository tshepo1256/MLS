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
  ListItemSecondaryAction,
  Avatar,
  Chip,
  IconButton,
  Button,
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
  LinearProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const mockTasks = [
  {
    id: 1,
    title: 'Review Contract Documents',
    description: 'Review and annotate the latest contract draft for Johnson case',
    assignedTo: {
      id: 1,
      name: 'Emma Wilson',
      role: 'Associate Attorney',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=FF69B4&color=fff',
    },
    assignedBy: {
      id: 2,
      name: 'Sarah Parker',
      role: 'Senior Partner',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Parker&background=9370DB&color=fff',
    },
    dueDate: '2024-03-25',
    priority: 'high',
    status: 'in_progress',
    progress: 60,
    case: 'Johnson vs. Smith Corp',
  },
  {
    id: 2,
    title: 'Prepare Court Filing',
    description: 'Draft and prepare court documents for upcoming hearing',
    assignedTo: {
      id: 3,
      name: 'James Lee',
      role: 'Legal Assistant',
      avatar: 'https://ui-avatars.com/api/?name=James+Lee&background=87CEEB&color=fff',
    },
    assignedBy: {
      id: 1,
      name: 'Emma Wilson',
      role: 'Associate Attorney',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=FF69B4&color=fff',
    },
    dueDate: '2024-03-28',
    priority: 'medium',
    status: 'pending',
    progress: 0,
    case: 'Johnson vs. Smith Corp',
  },
];

const TaskManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFA07A';
      case 'low':
        return '#98FB98';
      default:
        return '#98FB98';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderTaskList = () => (
    <List>
      {mockTasks.map((task) => (
        <Card key={task.id} sx={{ mb: 2 }}>
          <ListItem
            sx={{
              borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
            }}
          >
            <ListItemAvatar>
              <Avatar src={task.assignedTo.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">{task.title}</Typography>
                  <Chip
                    label={task.status.replace('_', ' ')}
                    size="small"
                    color={getStatusColor(task.status)}
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      icon={<AssignmentIcon />}
                      label={task.case}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<ScheduleIcon />}
                      label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={(event) => handleMenuOpen(event, task)}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Card>
      ))}
    </List>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Task Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          New Task
        </Button>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="All Tasks" />
        <Tab label="My Tasks" />
        <Tab label="Assigned by Me" />
        <Tab label="Completed" />
      </Tabs>

      {renderTaskList()}

      {/* Task Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark as Complete</MenuItem>
        <MenuItem onClick={handleMenuClose}>Reassign Task</MenuItem>
      </Menu>

      {/* New Task Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assign To</InputLabel>
                <Select label="Assign To">
                  <MenuItem value="1">Emma Wilson</MenuItem>
                  <MenuItem value="2">James Lee</MenuItem>
                  <MenuItem value="3">Sarah Parker</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority">
                  <MenuItem value="high">High Priority</MenuItem>
                  <MenuItem value="medium">Medium Priority</MenuItem>
                  <MenuItem value="low">Low Priority</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Related Case</InputLabel>
                <Select label="Related Case">
                  <MenuItem value="1">Johnson vs. Smith Corp</MenuItem>
                  <MenuItem value="2">Williams Estate Matter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManagement; 