import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCaseContext } from '../../context/CaseContext';
import CaseFinancials from '../billing/CaseFinancials';
import CaseDocuments from '../documents/CaseDocuments';
import CaseDetails from './CaseDetails';
import CaseParties from './CaseParties';
import CaseTimeline from './CaseTimeline';

const CaseWorkshop = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { currentCase, updateCase } = useCaseContext();
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'Case Details', component: <CaseDetails /> },
    { label: 'Timeline', component: <CaseTimeline /> },
    { label: 'Parties', component: <CaseParties /> },
    { label: 'Documents', component: <CaseDocuments /> },
    { label: 'Financials', component: <CaseFinancials /> },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h1">
              Case Reference: {currentCase?.reference}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentCase?.type} - {currentCase?.status}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {/* Handle case actions */}}
            >
              Case Actions
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabs[activeTab].component}
      </Box>
    </Box>
  );
};

export default CaseWorkshop; 