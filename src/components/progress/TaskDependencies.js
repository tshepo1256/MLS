import {
    Add,
    ExpandLess,
    ExpandMore,
    SubdirectoryArrowRight
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const TaskDependencies = ({ taskId }) => {
  const [open, setOpen] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState({
    title: '',
    description: '',
    estimatedHours: '',
  });

  // Mock data - replace with actual data from your context
  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      title: 'Research Case Law',
      description: 'Find relevant precedents',
      completed: false,
      dependencies: [2],
    },
    {
      id: 2,
      title: 'Draft Motion',
      description: 'Prepare initial draft',
      completed: false,
      dependencies: [],
    },
  ]);

  const handleToggle = (id) => {
    setOpen({ ...open, [id]: !open[id] });
  };

  const handleSubtaskComplete = (id) => {
    setSubtasks(subtasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleAddSubtask = () => {
    const newId = Math.max(...subtasks.map(st => st.id)) + 1;
    setSubtasks([...subtasks, { ...newSubtask, id: newId, dependencies: [] }]);
    setDialogOpen(false);
    setNewSubtask({ title: '', description: '', estimatedHours: '' });
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Task Dependencies</Typography>
          <Button
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            Add Subtask
          </Button>
        </Box>

        <List>
          {subtasks.map((subtask) => (
            <React.Fragment key={subtask.id}>
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    checked={subtask.completed}
                    onChange={() => handleSubtaskComplete(subtask.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={subtask.title}
                  secondary={subtask.description}
                />
                <IconButton onClick={() => handleToggle(subtask.id)}>
                  {open[subtask.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <Collapse in={open[subtask.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subtask.dependencies.map((depId) => {
                    const dep = subtasks.find(st => st.id === depId);
                    return (
                      <ListItem key={depId} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <SubdirectoryArrowRight />
                        </ListItemIcon>
                        <ListItemText
                          primary={dep?.title}
                          secondary="Dependency"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newSubtask.title}
            onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newSubtask.description}
            onChange={(e) => setNewSubtask({ ...newSubtask, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Estimated Hours"
            type="number"
            fullWidth
            value={newSubtask.estimatedHours}
            onChange={(e) => setNewSubtask({ ...newSubtask, estimatedHours: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubtask} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDependencies; 