import {
    AttachFile,
    AttachMoney,
    Delete,
    Edit,
    Gavel,
    Person,
    Print,
    Schedule,
    Share,
    Timeline,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseFinancials from '../billing/CaseFinancials';
import CaseParties from '../case/CaseParties';
import CaseTimeline from '../case/CaseTimeline';
import CaseDocuments from '../documents/CaseDocuments';
import './MatterDetails.css';

const MatterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - replace with context/API data
  const matter = {
    id,
    reference: 'CASE-2024-001',
    title: 'Smith vs. Johnson',
    type: 'Civil Litigation',
    status: 'Active',
    priority: 'High',
    description: 'Contract dispute regarding property development',
    client: 'John Smith',
    assignedTo: 'Jane Doe',
    courtName: 'High Court of South Africa',
    jurisdiction: 'Gauteng Division, Pretoria',
    filingDate: '2024-03-15',
    nextHearing: '2024-04-01',
    estimatedDuration: '12 months',
    estimatedCost: 'R 150,000',
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'success',
      'Pending': 'warning',
      'Closed': 'error',
      'On Hold': 'default',
    };
    return colors[status] || 'default';
  };

  const tabs = [
    { label: 'Overview', icon: <Gavel /> },
    { label: 'Timeline', icon: <Timeline /> },
    { label: 'Parties', icon: <Person /> },
    { label: 'Documents', icon: <AttachFile /> },
    { label: 'Financials', icon: <AttachMoney /> },
  ];

  const TabPanel = ({ children, value, index }) => (
    <Box role="tabpanel" hidden={value !== index} className="tab-panel">
      {value === index && children}
    </Box>
  );

  return (
    <Box className="matter-details-container">
      {/* Header */}
      <Paper elevation={3} className="matter-header">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {matter.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Reference: {matter.reference}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip
                label={matter.status}
                color={getStatusColor(matter.status)}
              />
              <Chip
                label={matter.priority}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={matter.type}
                color="default"
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="matter-actions">
              <IconButton onClick={() => navigate(`/matters/${id}/edit`)}>
                <Edit />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <Print />
              </IconButton>
              <IconButton color="error">
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Box className="matter-content">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className="matter-tabs"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className="info-section">
                <Typography variant="h6" gutterBottom>
                  Case Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Court</Typography>
                    <Typography>{matter.courtName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Jurisdiction</Typography>
                    <Typography>{matter.jurisdiction}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Filing Date</Typography>
                    <Typography>{new Date(matter.filingDate).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Next Hearing</Typography>
                    <Typography>{new Date(matter.nextHearing).toLocaleDateString()}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper className="info-section">
                <Typography variant="h6" gutterBottom>
                  Case Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2">Description</Typography>
                <Typography paragraph>{matter.description}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Estimated Duration</Typography>
                    <Typography>{matter.estimatedDuration}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Estimated Cost</Typography>
                    <Typography>{matter.estimatedCost}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
              <Paper className="quick-actions">
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Schedule />}
                      onClick={() => navigate(`/calendar/new?matterId=${id}`)}
                    >
                      Schedule Hearing
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<AttachFile />}
                      onClick={() => setActiveTab(3)}
                    >
                      Add Document
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Person />}
                      onClick={() => setActiveTab(2)}
                    >
                      Add Party
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<AttachMoney />}
                      onClick={() => setActiveTab(4)}
                    >
                      Record Expense
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Other Tabs */}
        <TabPanel value={activeTab} index={1}>
          <CaseTimeline />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <CaseParties />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <CaseDocuments />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <CaseFinancials />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default MatterDetails; 