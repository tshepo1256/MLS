import {
    AccessTime,
    Delete,
    Description,
    Edit,
    Folder,
    LocationOn,
    Notifications,
    Person,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import EventForm from './EventForm';

const EventDetails = ({ event, onClose }) => {
  const { deleteEvent } = useCalendarContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!event) return null;

  const getEventTypeColor = (type) => {
    const colors = {
      'HEARING': '#f44336',
      'MEETING': '#4caf50',
      'DEADLINE': '#ff9800',
      'TASK': '#2196f3',
    };
    return colors[type] || '#757575';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      onClose();
    }
  };

  if (isEditing) {
    return (
      <EventForm
        event={event}
        onClose={() => setIsEditing(false)}
        isEditing={true}
      />
    );
  }

  return (
    <Box>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{event.title}</Typography>
          <Box>
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Event Type and Status */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={event.extendedProps.type}
                sx={{ backgroundColor: getEventTypeColor(event.extendedProps.type), color: 'white' }}
              />
            </Box>
          </Grid>

          {/* Time and Location */}
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="Date & Time"
                  secondary={`${format(new Date(event.start), 'PPP p')} - ${format(new Date(event.end), 'p')}`}
                />
              </ListItem>

              {event.extendedProps.location && (
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={event.extendedProps.location}
                  />
                </ListItem>
              )}

              {event.extendedProps.caseId && (
                <ListItem>
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText
                    primary="Related Case"
                    secondary={event.extendedProps.caseTitle}
                  />
                </ListItem>
              )}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Description */}
          {event.extendedProps.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                <Description sx={{ mr: 1, verticalAlign: 'middle' }} />
                Description
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {event.extendedProps.description}
              </Typography>
            </Grid>
          )}

          {/* Attendees */}
          {event.extendedProps.attendees?.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Attendees
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {event.extendedProps.attendees.map((attendee, index) => (
                  <Chip
                    key={index}
                    label={attendee}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
          )}

          {/* Reminders */}
          {event.extendedProps.reminders?.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                Reminders
              </Typography>
              <List dense>
                {event.extendedProps.reminders.map((reminder, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${reminder.time} ${reminder.unit} before`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default EventDetails; 