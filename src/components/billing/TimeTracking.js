import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Chip,
  DialogContentText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

const mockTimeEntries = [
  {
    id: 1,
    matter: 'Smith vs. Johnson',
    activity: 'Document Review',
    date: '2024-03-20',
    duration: 120, // minutes
    rate: 3750, // Updated to ZAR
    status: 'billed',
    attorney: 'Emma Wilson',
  },
  {
    id: 2,
    matter: 'Williams Estate',
    activity: 'Client Meeting',
    date: '2024-03-20',
    duration: 60,
    rate: 3750, // Updated to ZAR
    status: 'unbilled',
    attorney: 'James Parker',
  },
  {
    id: 3,
    matter: 'Chen Contract Review',
    activity: 'Contract Analysis',
    date: '2024-03-19',
    duration: 90,
    rate: 3750, // Updated to ZAR
    status: 'unbilled',
    attorney: 'Emma Wilson',
  },
];

const TimeTracking = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTracking) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 60000); // Update every minute
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTracking]);

  const handleDialogOpen = (entry = null) => {
    setSelectedEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedEntry(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (entry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== entryToDelete.id));
    setDeleteDialogOpen(false);
    setEntryToDelete(null);
  };

  const handleStartTimer = () => {
    setIsTracking(true);
    setTimer(0);
  };

  const handleStopTimer = () => {
    setIsTracking(false);
    if (timer > 0) {
      handleDialogOpen({
        matter: '',
        activity: '',
        date: new Date().toISOString().split('T')[0],
        duration: timer,
        rate: 3750, // Default rate
        status: 'unbilled',
        attorney: 'Emma Wilson', // Default attorney
      });
    }
  };

  const handleAddEntry = (formData) => {
    const newEntry = {
      id: timeEntries.length + 1,
      ...formData,
    };
    setTimeEntries([newEntry, ...timeEntries]);
    handleDialogClose();
  };

  const handleUpdateEntry = (formData) => {
    setTimeEntries(timeEntries.map(entry => 
      entry.id === selectedEntry.id ? { ...entry, ...formData } : entry
    ));
    handleDialogClose();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateAmount = (duration, rate) => {
    return (duration / 60) * rate;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Time Tracking</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color={isTracking ? 'error' : 'success'}
            startIcon={isTracking ? <StopIcon /> : <PlayIcon />}
            onClick={isTracking ? handleStopTimer : handleStartTimer}
          >
            {isTracking ? 'Stop Timer' : 'Start Timer'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen()}
          >
            Add Time Entry
          </Button>
        </Box>
      </Box>

      {isTracking && (
        <Card sx={{ mb: 3, p: 3, bgcolor: 'primary.light' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TimerIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4">
              {formatDuration(timer)}
            </Typography>
          </Box>
        </Card>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Matter</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Attorney</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {new Date(entry.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{entry.matter}</TableCell>
                      <TableCell>{entry.activity}</TableCell>
                      <TableCell>{entry.attorney}</TableCell>
                      <TableCell align="right">
                        {formatDuration(entry.duration)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(entry.rate)}/hr
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(calculateAmount(entry.duration, entry.rate))}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={entry.status}
                          color={entry.status === 'billed' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleDialogOpen(entry)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(entry)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this time entry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Time Entry Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEntry ? 'Edit Time Entry' : 'Add Time Entry'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="matter-label">Matter</InputLabel>
                  <Select
                    labelId="matter-label"
                    label="Matter"
                    defaultValue={selectedEntry?.matter || ''}
                    name="matter"
                  >
                    <MenuItem value="Smith vs. Johnson">Smith vs. Johnson</MenuItem>
                    <MenuItem value="Williams Estate">Williams Estate</MenuItem>
                    <MenuItem value="Chen Contract Review">Chen Contract Review</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Activity"
                  name="activity"
                  defaultValue={selectedEntry?.activity}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  defaultValue={selectedEntry?.date}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  type="number"
                  name="duration"
                  defaultValue={selectedEntry?.duration}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rate (per hour)"
                  type="number"
                  name="rate"
                  defaultValue={selectedEntry?.rate}
                  InputProps={{
                    startAdornment: 'R',
                  }}
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    label="Status"
                    name="status"
                    defaultValue={selectedEntry?.status || 'unbilled'}
                  >
                    <MenuItem value="unbilled">Unbilled</MenuItem>
                    <MenuItem value="billed">Billed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={(e) => {
              e.preventDefault();
              const form = e.target.closest('form');
              const formData = {
                matter: form.matter.value,
                activity: form.activity.value,
                date: form.date.value,
                duration: parseInt(form.duration.value, 10),
                rate: parseFloat(form.rate.value),
                status: form.status.value,
                attorney: 'Emma Wilson',
              };
              
              if (selectedEntry) {
                handleUpdateEntry(formData);
              } else {
                handleAddEntry(formData);
              }
            }}
          >
            {selectedEntry ? 'Update Entry' : 'Add Entry'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTracking; 