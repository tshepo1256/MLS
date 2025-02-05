import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Tooltip as ChartTooltip,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

const TaskAnalytics = () => {
  // Mock data - replace with real data from your context
  const tasksByStatus = [
    { name: 'Not Started', value: 5 },
    { name: 'In Progress', value: 8 },
    { name: 'Under Review', value: 3 },
    { name: 'Completed', value: 12 },
  ];

  const tasksByPriority = [
    { name: 'High', tasks: 6 },
    { name: 'Medium', tasks: 12 },
    { name: 'Low', tasks: 8 },
  ];

  const teamPerformance = [
    {
      name: 'John Doe',
      completed: 15,
      inProgress: 5,
      overdue: 2,
      avatar: '/path-to-avatar1.jpg',
    },
    {
      name: 'Jane Smith',
      completed: 12,
      inProgress: 3,
      overdue: 1,
      avatar: '/path-to-avatar2.jpg',
    },
    // Add more team members...
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h3">28</Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ mt: 2 }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                75% Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                On Track
              </Typography>
              <Typography variant="h3" color="success.main">
                20
              </Typography>
              <Box sx={{ mt: 2 }}>
                <AvatarGroup max={4}>
                  {teamPerformance.map((member, index) => (
                    <Tooltip title={member.name} key={index}>
                      <Avatar src={member.avatar}>{member.name[0]}</Avatar>
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                At Risk
              </Typography>
              <Typography variant="h3" color="warning.main">
                5
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Requires immediate attention
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overdue
              </Typography>
              <Typography variant="h3" color="error.main">
                3
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="error">
                  Action required
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Task Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {tasksByStatus.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Team Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#4caf50" name="Completed" />
                  <Bar dataKey="inProgress" fill="#2196f3" name="In Progress" />
                  <Bar dataKey="overdue" fill="#f44336" name="Overdue" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Priority Distribution */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tasks by Priority
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByPriority}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar 
                    dataKey="tasks" 
                    fill="#1976d2"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskAnalytics; 