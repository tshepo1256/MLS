import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';

const TaskAssignment = ({ open, onClose, caseId }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: null,
    priority: 'Medium',
    estimatedHours: '',
    subtasks: [],
    attachments: [],
    watchers: [],
  });

  // Mock users data - replace with actual user data from your system
  const users = [
    { id: 1, name: 'John Doe', role: 'Attorney' },
    { id: 2, name: 'Jane Smith', role: 'Paralegal' },
    { id: 3, name: 'Mike Johnson', role: 'Associate' },
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleSubmit = () => {
    // Add validation here
    onClose(task);
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>Assign New Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.name}
              value={users.find(user => user.id === task.assignedTo) || null}
              onChange={(_, newValue) => setTask({ ...task, assignedTo: newValue?.id })}
              renderInput={(params) => <TextField {...params} label="Assign To" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{option.name[0]}</Avatar>
                  <Box>
                    <Typography>{option.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {option.role}
                    </Typography>
                  </Box>
                </Box>
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={task.priority}
                label="Priority"
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <DateTimePicker
              label="Due Date"
              value={task.dueDate}
              onChange={(newValue) => setTask({ ...task, dueDate: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Estimated Hours"
              type="number"
              value={task.estimatedHours}
              onChange={(e) => setTask({ ...task, estimatedHours: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={users}
              getOptionLabel={(option) => option.name}
              value={task.watchers}
              onChange={(_, newValue) => setTask({ ...task, watchers: newValue })}
              renderInput={(params) => <TextField {...params} label="Add Watchers" />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    avatar={<Avatar>{option.name[0]}</Avatar>}
                    label={option.name}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Assign Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskAssignment; 