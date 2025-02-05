import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Gavel as GavelIcon,
  Event as EventIcon,
  Description as DocumentIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const summaryCards = [
    { title: 'Active Cases', count: 24, icon: GavelIcon, color: '#FF69B4', path: '/matters' },
    { title: 'Today\'s Tasks', count: 8, icon: ScheduleIcon, color: '#9370DB', path: '/tasks' },
    { title: 'Pending Documents', count: 12, icon: DocumentIcon, color: '#87CEEB', path: '/documents' },
    { title: 'Upcoming Hearings', count: 5, icon: EventIcon, color: '#98FB98', path: '/calendar' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case',
      title: 'Smith vs. Johnson',
      description: 'New document uploaded',
      time: '2 hours ago',
      avatar: 'https://ui-avatars.com/api/?name=Smith&background=FF69B4&color=fff',
    },
    {
      id: 2,
      type: 'task',
      title: 'Contract Review',
      description: 'Task completed by Emma Wilson',
      time: '4 hours ago',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=9370DB&color=fff',
    },
    {
      id: 3,
      type: 'calendar',
      title: 'Client Meeting',
      description: 'Scheduled for tomorrow at 10:00 AM',
      time: '5 hours ago',
      avatar: 'https://ui-avatars.com/api/?name=Meeting&background=87CEEB&color=fff',
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'File Motion Response',
      date: '2024-03-25',
      priority: 'high',
      case: 'Smith vs. Johnson',
    },
    {
      id: 2,
      title: 'Document Review',
      date: '2024-03-26',
      priority: 'medium',
      case: 'Williams Estate',
    },
    {
      id: 3,
      title: 'Client Update',
      date: '2024-03-27',
      priority: 'low',
      case: 'Chen Contract',
    },
  ];

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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/matters/new')}
          >
            New Case
          </Button>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() => navigate('/clients')}
          >
            Add Client
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[10],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <Avatar
                sx={{
                  bgcolor: card.color,
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                <card.icon />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                {card.count}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {card.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={activity.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Deadlines
            </Typography>
            <List>
              {upcomingDeadlines.map((deadline) => (
                <React.Fragment key={deadline.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${getPriorityColor(deadline.priority)}`,
                    }}
                  >
                    <ListItemText
                      primary={deadline.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {deadline.case}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              icon={<EventIcon />}
                              label={new Date(deadline.date).toLocaleDateString()}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
