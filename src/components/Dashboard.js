import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  AccountBalance,
  Assessment,
  AttachMoney,
  Description,
  Event,
  Gavel,
  Schedule,
  Task,
} from '@mui/icons-material';
import { getMockData } from '../mock/mockData';

const Dashboard = () => {
  const theme = useTheme();
  const stats = getMockData('dashboardStats');

  const dashboardItems = [
    {
      title: 'Active Cases',
      value: stats.activeCases,
      icon: Gavel,
      color: theme.palette.primary.main,
      link: '/matters',
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: Task,
      color: theme.palette.warning.main,
      link: '/tasks',
    },
    {
      title: 'Upcoming Deadlines',
      value: stats.upcomingDeadlines,
      icon: Schedule,
      color: theme.palette.error.main,
      link: '/calendar/deadlines',
    },
    {
      title: 'Billable Hours',
      value: stats.billableHours,
      icon: Assessment,
      color: theme.palette.success.main,
      link: '/billing/time-tracking',
    },
    {
      title: 'Revenue This Month',
      value: stats.revenueThisMonth,
      icon: AttachMoney,
      color: theme.palette.info.main,
      link: '/billing/reports',
    },
    {
      title: 'Outstanding Payments',
      value: stats.outstandingPayments,
      icon: AccountBalance,
      color: theme.palette.error.main,
      link: '/billing/invoices',
    },
    {
      title: 'Documents Processed',
      value: stats.documentsProcessed,
      icon: Description,
      color: theme.palette.secondary.main,
      link: '/documents',
    },
    {
      title: 'Client Meetings',
      value: stats.clientMeetings,
      icon: Event,
      color: theme.palette.primary.main,
      link: '/calendar',
    },
  ];

  const tasks = getMockData('tasks');
  const teamTasks = getMockData('teamTasks');
  const recentAnalyses = getMockData('documentAnalysis')?.recentAnalyses || [];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => window.location.href = item.link}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${item.color}20`,
                    }}
                  >
                    <item.icon sx={{ color: item.color }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: item.color }}>
                    {item.value}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Tasks
              </Typography>
              {tasks.slice(0, 3).map((task) => (
                <Box key={task.id} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2">{task.title}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          task.priority === 'High'
                            ? 'error.main'
                            : task.priority === 'Medium'
                            ? 'warning.main'
                            : 'success.main',
                      }}
                    >
                      {task.priority}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={task.checklist ? (task.checklist.filter(item => item.completed).length / task.checklist.length) * 100 : 0}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Due: {task.dueDate}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Team Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Tasks
              </Typography>
              {teamTasks.map((task) => (
                <Box key={task.id} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2">{task.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.assignedTo.length} members
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {task.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Due: {task.dueDate}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Document Analyses */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Document Analyses
              </Typography>
              <Grid container spacing={2}>
                {recentAnalyses.map((analysis) => (
                  <Grid item xs={12} md={6} key={analysis.id}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {analysis.documentName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            analysis.riskLevel === 'High'
                              ? 'error.main'
                              : analysis.riskLevel === 'Medium'
                              ? 'warning.main'
                              : 'success.main',
                        }}
                      >
                        Risk Level: {analysis.riskLevel}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Key Findings:
                        </Typography>
                        <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                          {analysis.findings.slice(0, 2).map((finding, index) => (
                            <li key={index}>
                              <Typography variant="caption">
                                {finding}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
