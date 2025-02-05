import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const caseTypes = [
  'Civil Litigation',
  'Criminal Defense',
  'Family Law',
  'Corporate Law',
  'Real Estate',
  'Intellectual Property',
  'Employment Law',
  'Immigration',
];

const priorityLevels = [
  { value: 'high', label: 'High Priority', color: '#FF6B6B' },
  { value: 'medium', label: 'Medium Priority', color: '#FFA07A' },
  { value: 'low', label: 'Low Priority', color: '#98FB98' },
];

const mockTeamMembers = [
  { id: 1, name: 'Emma Wilson', role: 'Associate Attorney' },
  { id: 2, name: 'James Parker', role: 'Legal Assistant' },
  { id: 3, name: 'Sophie Chen', role: 'Paralegal' },
  { id: 4, name: 'Maria Garcia', role: 'Secretary' },
];

const steps = ['Basic Information', 'Team Assignment', 'Timeline & Milestones', 'Documents & Notes'];

const MatterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    caseType: '',
    priority: '',
    description: '',
    startDate: null,
    estimatedEndDate: null,
    assignedTeam: [],
    leadAttorney: null,
    milestones: [
      { title: '', dueDate: null, assignee: null, description: '' }
    ],
    clientInfo: {
      name: '',
      email: '',
      phone: '',
    },
    documents: [],
    notes: '',
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Case Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Case Number"
                value={formData.caseNumber}
                onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Case Type</InputLabel>
                <Select
                  value={formData.caseType}
                  onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                  label="Case Type"
                >
                  {caseTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  label="Priority"
                >
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: priority.color,
                            mr: 1,
                          }}
                        />
                        {priority.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Case Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date })}
                renderInput={(params) => <TextField {...params} fullWidth />}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Estimated End Date"
                value={formData.estimatedEndDate}
                onChange={(date) => setFormData({ ...formData, estimatedEndDate: date })}
                renderInput={(params) => <TextField {...params} fullWidth />}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                value={formData.leadAttorney}
                onChange={(_, newValue) => setFormData({ ...formData, leadAttorney: newValue })}
                options={mockTeamMembers}
                getOptionLabel={(option) => `${option.name} (${option.role})`}
                renderInput={(params) => (
                  <TextField {...params} label="Lead Attorney" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                value={formData.assignedTeam}
                onChange={(_, newValue) => setFormData({ ...formData, assignedTeam: newValue })}
                options={mockTeamMembers}
                getOptionLabel={(option) => `${option.name} (${option.role})`}
                renderInput={(params) => (
                  <TextField {...params} label="Assign Team Members" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={`${option.name} (${option.role})`}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {formData.milestones.map((milestone, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Milestone {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Milestone Title"
                    value={milestone.title}
                    onChange={(e) => {
                      const newMilestones = [...formData.milestones];
                      newMilestones[index].title = e.target.value;
                      setFormData({ ...formData, milestones: newMilestones });
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Due Date"
                    value={milestone.dueDate}
                    onChange={(date) => {
                      const newMilestones = [...formData.milestones];
                      newMilestones[index].dueDate = date;
                      setFormData({ ...formData, milestones: newMilestones });
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={milestone.assignee}
                    onChange={(_, newValue) => {
                      const newMilestones = [...formData.milestones];
                      newMilestones[index].assignee = newValue;
                      setFormData({ ...formData, milestones: newMilestones });
                    }}
                    options={mockTeamMembers}
                    getOptionLabel={(option) => `${option.name} (${option.role})`}
                    renderInput={(params) => (
                      <TextField {...params} label="Assignee" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Milestone Description"
                    value={milestone.description}
                    onChange={(e) => {
                      const newMilestones = [...formData.milestones];
                      newMilestones[index].description = e.target.value;
                      setFormData({ ...formData, milestones: newMilestones });
                    }}
                  />
                </Grid>
                {index < formData.milestones.length - 1 && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>
                )}
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() =>
                  setFormData({
                    ...formData,
                    milestones: [
                      ...formData.milestones,
                      { title: '', dueDate: null, assignee: null, description: '' },
                    ],
                  })
                }
              >
                Add Milestone
              </Button>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Initial Case Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any initial notes, observations, or special instructions for the case..."
              />
            </Grid>
            {/* Add document upload functionality here */}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Create New Case
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {renderStepContent(activeStep)}
          </LocalizationProvider>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Create Case' : 'Next'}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default MatterForm; 