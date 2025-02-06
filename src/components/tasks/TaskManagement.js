import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add,
  Assignment,
  AttachFile,
  CheckCircle,
  Comment,
  Delete,
  Edit,
  Flag,
  MoreVert,
  Schedule,
} from '@mui/icons-material';
import { getMockData } from '../../mock/mockData';
import { format, isValid, parseISO } from 'date-fns';

const TaskManagement = ({ filter = 'all' }) => {
  const theme = useTheme();
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const tasks = getMockData('tasks');

  const taskStatuses = ['All', 'Not Started', 'In Progress', 'Completed'];
  const priorities = ['High', 'Medium', 'Low'];

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'No date set';
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date';
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getTaskProgress = (task) => {
    if (!Array.isArray(task?.checklist)) return 0;
    const total = task.checklist.length;
    if (total === 0) return 0;
    const completed = task.checklist.filter((item) => item.completed).length;
    return (completed / total) * 100;
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredTasks = tasks.filter((task) => {
    if (currentTab === 0) return true;
    return task?.status === taskStatuses[currentTab];
  });

  const renderTaskDialog = () => (
    <Dialog
      open={taskDialogOpen}
      onClose={() => setTaskDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {selectedTask?.title || 'Task Details'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <Typography>
              {selectedTask?.description || 'No description available'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Assigned To
            </Typography>
            <Typography>{selectedTask?.assignedTo || 'Unassigned'}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Due Date
            </Typography>
            <Typography>{formatDate(selectedTask?.dueDate)}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Checklist
            </Typography>
            <List dense>
              {Array.isArray(selectedTask?.checklist) &&
                selectedTask.checklist.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      {item.completed ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Schedule color="action" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Comments
            </Typography>
            <List>
              {Array.isArray(selectedTask?.comments) &&
                selectedTask.comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <ListItemText
                      primary={comment.text}
                      secondary={`${comment.user} - ${formatDate(
                        comment.timestamp
                      )}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Attachments
            </Typography>
            <List dense>
              {Array.isArray(selectedTask?.attachments) &&
                selectedTask.attachments.map((attachment) => (
                  <ListItem key={attachment.id}>
                    <ListItemIcon>
                      <AttachFile />
                    </ListItemIcon>
                    <ListItemText
                      primary={attachment.name}
                      secondary={`Uploaded by ${
                        attachment.uploadedBy
                      } on ${formatDate(attachment.uploadDate)}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setTaskDialogOpen(false)}>Close</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTaskDialogOpen(false)}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderNewTaskDialog = () => (
    <Dialog
      open={newTaskDialogOpen}
      onClose={() => setNewTaskDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Assigned To"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Matter"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewTaskDialogOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setNewTaskDialogOpen(false)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Tabs value={currentTab} onChange={handleTabChange}>
          {taskStatuses.map((status, index) => (
            <Tab key={status} label={status} />
          ))}
        </Tabs>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setNewTaskDialogOpen(true)}
        >
          New Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Assignment color="primary" />
                    <Typography variant="h6">
                      {task.title || 'Untitled Task'}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, task)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  {task.description || 'No description available'}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Chip
                        size="small"
                        label={task.status || 'No Status'}
                        color={task.status === 'Completed' ? 'success' : 'default'}
                      />
                    </Grid>
                    <Grid item>
                      <Chip
                        size="small"
                        icon={<Flag />}
                        label={task.priority || 'No Priority'}
                        sx={{
                          bgcolor: getPriorityColor(task.priority),
                          color: 'white',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={getTaskProgress(task)}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Progress
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Due: {formatDate(task.dueDate)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {Array.isArray(task.comments) && task.comments.length > 0 && (
                      <Chip
                        size="small"
                        icon={<Comment />}
                        label={task.comments.length}
                      />
                    )}
                    {Array.isArray(task.attachments) &&
                      task.attachments.length > 0 && (
                        <Chip
                          size="small"
                          icon={<AttachFile />}
                          label={task.attachments.length}
                        />
                      )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleTaskClick(selectedTask);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <Assignment fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {renderTaskDialog()}
      {renderNewTaskDialog()}
    </Box>
  );
};

export default TaskManagement; 