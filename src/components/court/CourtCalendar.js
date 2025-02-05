import {
    Add,
    Delete,
    Edit,
    Event,
    Gavel,
    LocationOn,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourtCalendar = () => {
  const navigate = useNavigate();

  // Mock court hearings data
  const courtHearings = [
    {
      id: 1,
      caseRef: 'CASE-2024-001',
      title: 'Smith vs. Johnson',
      date: '2024-04-01T10:00:00',
      court: 'High Court of South Africa',
      courtRoom: 'Court Room 3',
      judge: 'Judge Williams',
      type: 'Motion Hearing',
      status: 'Scheduled',
    },
    {
      id: 2,
      caseRef: 'CASE-2024-002',
      title: 'State vs. Williams',
      date: '2024-04-15T09:00:00',
      court: 'Magistrate Court',
      courtRoom: 'Court Room 1',
      judge: 'Judge Brown',
      type: 'Trial',
      status: 'Confirmed',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">Court Calendar</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/court/calendar/new')}
            >
              Schedule Hearing
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <List>
              {courtHearings.map((hearing) => (
                <ListItem
                  key={hearing.id}
                  sx={{
                    mb: 2,
                    border: '1px solid #eee',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Gavel />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {hearing.title}
                        </Typography>
                        <Chip
                          label={hearing.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={hearing.status}
                          size="small"
                          color={hearing.status === 'Confirmed' ? 'success' : 'warning'}
                        />
                      </Box>
                    }
                    secondary={
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Event fontSize="small" color="action" />
                            <Typography variant="body2">
                              {new Date(hearing.date).toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2">
                              {hearing.court} - {hearing.courtRoom}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            Judge: {hearing.judge}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/court/calendar/${hearing.id}/edit`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        // Handle delete
                        if (window.confirm('Are you sure you want to delete this hearing?')) {
                          console.log('Delete hearing:', hearing.id);
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourtCalendar; 