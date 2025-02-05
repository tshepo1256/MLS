import {
    Add,
    FilterList,
    Search,
    ViewList,
    ViewModule,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import TaskProgress from './TaskProgress';

const ProgressDashboard = () => {
  const [view, setView] = useState('list');
  const [tab, setTab] = useState(0);
  const { activities, realTimeUpdates } = useProgress();

  const tabs = ['All Tasks', 'In Progress', 'Completed', 'Overdue'];

  const mockTasks = [
    {
      id: 1,
      title: 'Document Review',
      description: 'Review case documents and prepare summary',
      progress: 75,
      dueDate: '2024-04-15',
      assignedTo: 'John Doe',
      priority: 'High',
      status: 'In Progress',
    },
    // Add more mock tasks...
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Progress Tracking</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setView(view === 'list' ? 'grid' : 'list')}>
                {view === 'list' ? <ViewModule /> : <ViewList />}
              </IconButton>
              <Button
                variant="contained"
                startIcon={<Add />}
              >
                Assign New Task
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((label, index) => (
                  <Tab key={index} label={label} />
                ))}
              </Tabs>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
            >
              Filter
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {mockTasks.map((task) => (
              <Grid item xs={12} md={view === 'grid' ? 6 : 12} key={task.id}>
                <TaskProgress task={task} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressDashboard; 