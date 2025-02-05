import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FaBell, FaLock, FaMoneyBillWave, FaTags, FaUser, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './EditMatter.css';
import Sidebar from './Sidebar';

const EditMatter = () => {
  const [mentionedUser, setMentionedUser] = useState("");
  const navigate = useNavigate();  // Initialize navigate hook

  const handleMention = (event) => {
    const value = event.target.value;
    if (value.includes('@')) {
      const user = value.split('@')[1].trim();
      if (['John Doe', 'Jane Smith', 'Robert Brown', 'Lisa Green'].includes(user)) {
        setMentionedUser(user);
      } else {
        setMentionedUser('');
      }
    }
  };

  const handleConfirm = () => {
    alert("Changes Confirmed!");
  };

  const handleGoToWorkspace = () => {
    navigate('/case-workshop');
  };

  return (
    <div className="matter-creation-container">
      <Sidebar />
      <div className="matter-creation-content">
        <h1 className="title">Edit Matter</h1>

        {/* Navigation Bar */}
        <div className="nav-bar">
          <Button className="nav-btn" href="#matter-info"><FaUser /> Matter Info</Button>
          <Button className="nav-btn" href="#client-info"><FaUser /> Client Info</Button>
          <Button className="nav-btn" href="#solicitor-details"><FaUsers /> Solicitor Details</Button>
          <Button className="nav-btn" href="#matter-status"><FaTags /> Status & Dates</Button>
          <Button className="nav-btn" href="#matter-permissions"><FaLock /> Permissions</Button>
          <Button className="nav-btn" href="#matter-notifications"><FaBell /> Notifications</Button>
          <Button className="nav-btn" href="#related-contacts"><FaUsers /> Related Contacts</Button>
          <Button className="nav-btn" href="#billing-preference"><FaMoneyBillWave /> Billing</Button>
        </div>

        {/* Sections */}
        <div id="matter-info" className="section">
          <h2><FaUser /> Matter Information</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Name" fullWidth defaultValue="Commercial Contract" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Description" multiline rows={3} fullWidth defaultValue="A contract for a commercial partnership." />
            </Grid>
          </Grid>
        </div>

        <div id="client-info" className="section">
          <h2><FaUser /> Client Information</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Client Name" fullWidth defaultValue="XYZ Corp." />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Client Reference Number" fullWidth defaultValue="ABC123" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Location" fullWidth defaultValue="New York, NY" />
            </Grid>
          </Grid>
        </div>

        <div id="solicitor-details" className="section">
          <h2><FaUsers /> Solicitor Details</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Responsible Solicitor" fullWidth defaultValue="John Doe" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Originating Solicitor" fullWidth defaultValue="Jane Smith" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Solicitor Reference" fullWidth defaultValue="SOL123" />
            </Grid>
          </Grid>
        </div>

        <div id="matter-status" className="section">
          <h2><FaTags /> Status & Dates</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Status" defaultValue="Open" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Open Date" type="date" fullWidth defaultValue="2023-11-01" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Closed Date" type="date" fullWidth defaultValue="2024-11-01" />
            </Grid>
          </Grid>
        </div>

        <div id="matter-permissions" className="section">
          <h2><FaLock /> Matter Permissions</h2>
          <TextField label="Firm Users with Access" fullWidth defaultValue="John Doe, Jane Smith" />
        </div>

        <div id="matter-notifications" className="section">
          <h2><FaBell /> Matter Notifications</h2>
          <TextField label="Firm User to Notify" fullWidth defaultValue="John Doe" />
        </div>

        <div id="related-contacts" className="section">
          <h2><FaUsers /> Related Contacts</h2>
          <TextField label="Contact Name" fullWidth defaultValue="Robert Brown" />
          <TextField label="Relationship" fullWidth defaultValue="Consultant" />
          <Button variant="contained" color="primary">Add Related Contact</Button>
        </div>

        <div id="billing-preference" className="section">
          <h2><FaMoneyBillWave /> Billing Preferences</h2>
          <FormControl fullWidth>
            <InputLabel>Billing Method</InputLabel>
            <Select defaultValue="Hourly">
              <MenuItem value="Hourly">Hourly</MenuItem>
              <MenuItem value="Flat Rate">Flat Rate</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Matter Budget" fullWidth defaultValue="10000" />
          <Button variant="contained" color="secondary">Add Custom Billing Rate</Button>
        </div>

        <div className="mention-section">
          <h2><FaUser /> Mention User</h2>
          <TextField
            label="Mention User (@username)"
            value={mentionedUser ? `@${mentionedUser}` : ''}
            onChange={handleMention}
            fullWidth
            helperText={mentionedUser ? `User: ${mentionedUser}` : 'Type @username'}
          />
        </div>

        {/* Buttons for Confirm and Navigate to Workspace */}
        <div className="action-buttons">
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm Changes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleGoToWorkspace}>
            Go to Cases Workspace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditMatter;
