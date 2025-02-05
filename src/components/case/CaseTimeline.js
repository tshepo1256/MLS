import { Add, Edit, Event, Gavel, Note } from '@mui/icons-material';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator,
} from '@mui/lab';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

const CaseTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      date: '2024-03-15',
      type: 'HEARING',
      title: 'Initial Hearing',
      description: 'Case first appearance in High Court',
      judge: 'Judge Smith',
      outcome: 'Postponed for further evidence',
    },
    {
      id: 2,
      date: '2024-03-20',
      type: 'DOCUMENT',
      title: 'Evidence Submission',
      description: 'Additional evidence documents submitted',
    },
    // Add more timeline events
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 20, top: -60 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
        >
          Add Event
        </Button>
      </Box>
      
      <Timeline position="alternate">
        {timelineEvents.map((event) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot color={event.type === 'HEARING' ? 'primary' : 'secondary'}>
                {event.type === 'HEARING' ? <Gavel /> : <Note />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="h3">
                    {event.title}
                  </Typography>
                  <IconButton size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <Event fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {event.description}
                </Typography>
                {event.judge && (
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Judge: {event.judge}
                  </Typography>
                )}
                {event.outcome && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Outcome: {event.outcome}
                  </Typography>
                )}
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default CaseTimeline; 