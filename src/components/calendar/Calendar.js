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
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add,
  Event,
  LocationOn,
  People,
  Person,
  Schedule,
} from '@mui/icons-material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getMockData } from '../../mock/mockData';
import { format, parseISO } from 'date-fns';

const Calendar = ({ view = 'personal' }) => {
  const theme = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

  const events = getMockData('calendarEvents').map(event => ({
    ...event,
    start: event.start ? new Date(event.start) : null,
    end: event.end ? new Date(event.end) : null,
  }));

  const handleEventClick = (info) => {
    const event = events.find(e => e.id === parseInt(info.event.id));
    if (event) {
      setSelectedEvent(event);
      setEventDialogOpen(true);
    }
  };

  const handleDateClick = (info) => {
    setNewEventDialogOpen(true);
  };

  const formatEventDate = (dateString) => {
    try {
      if (!dateString) return '';
      return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const renderEventDialog = () => (
    <Dialog
      open={eventDialogOpen}
      onClose={() => setEventDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {selectedEvent?.title || 'Event Details'}
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <Schedule />
            </ListItemIcon>
            <ListItemText
              primary="Time"
              secondary={
                selectedEvent?.allDay
                  ? 'All Day'
                  : `${formatEventDate(selectedEvent?.start)} - ${formatEventDate(
                      selectedEvent?.end
                    )}`
              }
            />
          </ListItem>
          {selectedEvent?.location && (
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText
                primary="Location"
                secondary={selectedEvent.location}
              />
            </ListItem>
          )}
          {Array.isArray(selectedEvent?.attendees) && selectedEvent.attendees.length > 0 && (
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="Attendees"
                secondary={selectedEvent.attendees.join(', ')}
              />
            </ListItem>
          )}
          {selectedEvent?.description && (
            <ListItem>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText
                primary="Description"
                secondary={selectedEvent.description}
              />
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEventDialogOpen(false)}>Close</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEventDialogOpen(false)}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderNewEventDialog = () => (
    <Dialog
      open={newEventDialogOpen}
      onClose={() => setNewEventDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>New Event</DialogTitle>
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Date"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Attendees"
              variant="outlined"
              placeholder="Enter email addresses"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewEventDialogOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setNewEventDialogOpen(false)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setNewEventDialogOpen(true)}
        >
          Add Event
        </Button>
      </Box>

      <Paper elevation={0}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view === 'team' ? 'timeGridWeek' : 'dayGridMonth'}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events.map(event => ({
            id: event.id.toString(),
            title: event.title || 'Untitled Event',
            start: event.start,
            end: event.end,
            allDay: event.allDay || false,
            color: event.color || theme.palette.primary.main,
          }))}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="auto"
          aspectRatio={1.8}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '17:00',
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}
        />
      </Paper>

      {renderEventDialog()}
      {renderNewEventDialog()}
    </Box>
  );
};

export default Calendar; 