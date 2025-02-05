import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  DialogContentText,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft,
  ChevronRight,
  Today as TodayIcon,
  ViewDay,
  ViewWeek,
  ViewModule,
  Event as EventIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const mockEvents = [
  {
    id: 1,
    title: 'Client Meeting - Smith Case',
    start: '2024-03-25T10:00',
    end: '2024-03-25T11:00',
    type: 'meeting',
    location: 'Conference Room A',
    description: 'Initial consultation for Smith vs. Johnson case',
  },
  {
    id: 2,
    title: 'Court Hearing - Williams Case',
    start: '2024-03-26T14:00',
    end: '2024-03-26T16:00',
    type: 'court',
    location: 'District Court',
    description: 'Preliminary hearing for State vs. Williams',
  },
  {
    id: 3,
    title: 'Document Review Deadline',
    start: '2024-03-27T17:00',
    end: '2024-03-27T17:00',
    type: 'deadline',
    description: 'Complete review of contract documents',
  },
];

const Calendar = ({ view = 'month' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState(view);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(mockEvents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (selectedView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (selectedView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (selectedView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (selectedView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (event, newView) => {
    setSelectedView(newView);
  };

  const handleDialogOpen = (event = null) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setEvents(events.filter(event => event.id !== eventToDelete.id));
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleAddEvent = (formData) => {
    const newEvent = {
      id: events.length + 1,
      ...formData,
    };
    setEvents([...events, newEvent]);
    handleDialogClose();
  };

  const handleUpdateEvent = (formData) => {
    setEvents(events.map(event => 
      event.id === selectedEvent.id ? { ...event, ...formData } : event
    ));
    handleDialogClose();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, isCurrentMonth: true });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }

    return days;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          {weekDays.map((day) => (
            <Grid item xs key={day}>
              <Typography
                align="center"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {days.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Card
                sx={{
                  height: 120,
                  p: 1,
                  opacity: day.isCurrentMonth ? 1 : 0.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => handleDialogOpen()}
              >
                <Typography
                  align="center"
                  sx={{
                    fontWeight:
                      day.date.toDateString() === new Date().toDateString()
                        ? 'bold'
                        : 'normal',
                    color:
                      day.date.toDateString() === new Date().toDateString()
                        ? 'primary.main'
                        : 'text.primary',
                  }}
                >
                  {day.date.getDate()}
                </Typography>
                {events
                  .filter(
                    (event) =>
                      new Date(event.start).toDateString() ===
                      day.date.toDateString()
                  )
                  .slice(0, 2)
                  .map((event) => (
                    <Box
                      key={event.id}
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        p: 0.5,
                        borderRadius: 1,
                        mb: 0.5,
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDialogOpen(event);
                      }}
                    >
                      <Typography variant="caption" noWrap sx={{ flex: 1 }}>
                        {event.title}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ 
                          p: 0.25,
                          color: 'inherit',
                          '&:hover': { bgcolor: 'primary.main' }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(event);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <Box sx={{ mt: 2 }}>
        <Card sx={{ p: 2 }}>
          {hours.map((hour) => (
            <Box
              key={hour}
              sx={{
                display: 'flex',
                borderBottom: '1px solid',
                borderColor: 'divider',
                minHeight: 60,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  pr: 2,
                  textAlign: 'right',
                  color: 'text.secondary',
                }}
              >
                {`${hour.toString().padStart(2, '0')}:00`}
              </Box>
              <Box sx={{ flex: 1 }}>
                {events
                  .filter((event) => {
                    const eventHour = new Date(event.start).getHours();
                    return eventHour === hour;
                  })
                  .map((event) => (
                    <Box
                      key={event.id}
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onClick={() => handleDialogOpen(event)}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{event.title}</Typography>
                        <Typography variant="caption">
                          {event.location || event.description}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        sx={{ color: 'inherit' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(event);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
        </Card>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Calendar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Add Event
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handlePrevious}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ChevronRight />
        </IconButton>
        <Button
          startIcon={<TodayIcon />}
          onClick={handleToday}
          sx={{ ml: 1, mr: 2 }}
        >
          Today
        </Button>
        <Typography variant="h6">
          {currentDate.toLocaleDateString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Tabs value={selectedView} onChange={handleViewChange}>
            <Tab
              icon={<ViewDay />}
              label="Day"
              value="day"
            />
            <Tab
              icon={<ViewWeek />}
              label="Week"
              value="week"
            />
            <Tab
              icon={<ViewModule />}
              label="Month"
              value="month"
            />
          </Tabs>
        </Box>
      </Box>

      {selectedView === 'month' && renderMonthView()}
      {selectedView === 'day' && renderDayView()}
      {selectedView === 'week' && renderMonthView() /* Implement week view */}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                defaultValue={selectedEvent?.title}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date & Time"
                type="datetime-local"
                name="start"
                defaultValue={selectedEvent?.start}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date & Time"
                type="datetime-local"
                name="end"
                defaultValue={selectedEvent?.end}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  label="Event Type"
                  name="type"
                  defaultValue={selectedEvent?.type || 'meeting'}
                >
                  <MenuItem value="meeting">Meeting</MenuItem>
                  <MenuItem value="court">Court Hearing</MenuItem>
                  <MenuItem value="deadline">Deadline</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                defaultValue={selectedEvent?.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                defaultValue={selectedEvent?.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              const formData = {
                title: document.querySelector('[name="title"]').value,
                start: document.querySelector('[name="start"]').value,
                end: document.querySelector('[name="end"]').value,
                type: document.querySelector('[name="type"]').value,
                location: document.querySelector('[name="location"]').value,
                description: document.querySelector('[name="description"]').value,
              };
              
              if (selectedEvent) {
                handleUpdateEvent(formData);
              } else {
                handleAddEvent(formData);
              }
            }}
          >
            {selectedEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar; 