import {
    Autocomplete,
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React, { useState } from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import { useCaseContext } from '../../context/CaseContext';

const EventForm = ({ selectedDate, onClose }) => {
  const { addEvent } = useCalendarContext();
  const { cases } = useCaseContext();
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    start: selectedDate?.start || new Date(),
    end: selectedDate?.end || new Date(),
    location: '',
    description: '',
    caseId: null,
    attendees: [],
    reminders: [],
  });

  const eventTypes = [
    { value: 'HEARING', label: 'Court Hearing' },
    { value: 'MEETING', label: 'Meeting' },
    { value: 'DEADLINE', label: 'Deadline' },
    { value: 'TASK', label: 'Task' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    onClose();
  };

  return (
    <Box>
      <DialogTitle>
        {selectedDate ? 'Schedule New Event' : 'Create Event'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={cases}
                getOptionLabel={(option) => option.title}
                value={cases.find(c => c.id === formData.caseId) || null}
                onChange={(_, newValue) => setFormData({ ...formData, caseId: newValue?.id })}
                renderInput={(params) => <TextField {...params} label="Related Case" />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.start}
                onChange={(newValue) => setFormData({ ...formData, start: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.end}
                onChange={(newValue) => setFormData({ ...formData, end: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Event
        </Button>
      </DialogActions>
    </Box>
  );
};

export default EventForm; 