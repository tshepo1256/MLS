import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useCaseContext } from '../../context/CaseContext';

const CaseDetails = () => {
  const { currentCase, updateCase } = useCaseContext();
  const [formData, setFormData] = useState({
    caseNumber: '',
    caseType: '',
    courtName: '',
    jurisdiction: '',
    filingDate: '',
    status: '',
    priority: 'medium',
    description: '',
    judgeName: '',
    nextHearingDate: '',
  });

  const caseTypes = [
    'Criminal', 'Civil', 'Commercial', 'Constitutional',
    'Labour', 'Family', 'Administrative', 'Tax'
  ];

  const jurisdictions = [
    'High Court', 'Supreme Court of Appeal', 'Constitutional Court',
    'Magistrate Court', 'Labour Court', 'Land Claims Court'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCase(currentCase.id, formData);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Case Number"
              value={formData.caseNumber}
              onChange={(e) => setFormData({...formData, caseNumber: e.target.value})}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Case Type</InputLabel>
              <Select
                value={formData.caseType}
                onChange={(e) => setFormData({...formData, caseType: e.target.value})}
              >
                {caseTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Jurisdiction</InputLabel>
              <Select
                value={formData.jurisdiction}
                onChange={(e) => setFormData({...formData, jurisdiction: e.target.value})}
              >
                {jurisdictions.map(j => (
                  <MenuItem key={j} value={j}>{j}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Filing Date"
              InputLabelProps={{ shrink: true }}
              value={formData.filingDate}
              onChange={(e) => setFormData({...formData, filingDate: e.target.value})}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Case Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Case Details
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CaseDetails; 