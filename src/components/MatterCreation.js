import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import {
  FaBell,
  FaFolderOpen,
  FaLock,
  FaMoneyBillWave,
  FaTags,
  FaUser,
  FaUsers
} from 'react-icons/fa';
import './MatterCreation.css';
import Sidebar from './Sidebar';

const users = ['John Doe', 'Jane Smith', 'Robert Brown', 'Lisa Green'];
const templates = ['Default Template', 'Litigation', 'Contract Review'];

const MatterCreation = () => {
  const [mentionedUser, setMentionedUser] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isBillable, setIsBillable] = useState(true);

  const handleMention = (event) => {
    const value = event.target.value;
    if (value.includes('@')) {
      const user = value.split('@')[1].trim();
      if (users.includes(user)) {
        setMentionedUser(user);
      } else {
        setMentionedUser('');
      }
    }
  };

  const handleCreateMatter = () => {
    alert('Matter created successfully!');
  };

  return (
    <div className="matter-creation-container">
      <Sidebar />
      <div className="navigation-bar">
        <Button className="nav-btn" href="#matter-info"><FaUser /> Matter Info</Button>
        <Button className="nav-btn" href="#client-info"><FaUser /> Client Info</Button>
        <Button className="nav-btn" href="#solicitor-details"><FaUsers /> Solicitor Details</Button>
        <Button className="nav-btn" href="#matter-status"><FaTags /> Status & Dates</Button>
        <Button className="nav-btn" href="#matter-permissions"><FaLock /> Permissions</Button>
        <Button className="nav-btn" href="#matter-notifications"><FaBell /> Notifications</Button>
        <Button className="nav-btn" href="#related-contacts"><FaUsers /> Related Contacts</Button>
        <Button className="nav-btn" href="#custom-fields"><FaTags /> Custom Fields</Button>
        <Button className="nav-btn" href="#billing-preference"><FaMoneyBillWave /> Billing</Button>
        <Button className="nav-btn" href="#task-lists"><FaBell /> Task Lists</Button>
        <Button className="nav-btn" href="#document-folders"><FaFolderOpen /> Document Folders</Button>
        <Button className="nav-btn" href="#solicitor-allocation"><FaTags /> Solicitor Allocation</Button>
      </div>
      <div className="matter-creation-content">
        <h1 className="title">Create a Matter</h1>

        {/* Template Section */}
        <div className="section">
          <h2><FaTags /> Template Information</h2>
          <p>Enhance your process by creating a template that can be applied to any matter.</p>
          <FormControl fullWidth>
            <InputLabel>Select Template</InputLabel>
            <Select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
              {templates.map((template, index) => (
                <MenuItem key={index} value={template}>{template}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Matter Info */}
        <div id="matter-info" className="section">
          <h2><FaUser /> Matter Information</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Description" multiline rows={3} fullWidth />
            </Grid>
          </Grid>
        </div>

        {/* Client Info */}
        <div id="client-info" className="section">
          <h2><FaUser /> Client Information</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Client Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Client Reference Number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Location" fullWidth />
            </Grid>
          </Grid>
        </div>

        {/* Solicitor Details */}
        <div id="solicitor-details" className="section">
          <h2><FaUsers /> Solicitor Details</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Responsible Solicitor" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Originating Solicitor" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Solicitor Reference" fullWidth />
            </Grid>
          </Grid>
        </div>

        {/* Status & Dates */}
        <div id="matter-status" className="section">
          <h2><FaTags /> Status & Dates</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Matter Status" defaultValue="Open" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Open Date" type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Closed Date" type="date" fullWidth />
            </Grid>
          </Grid>
        </div>

        {/* Matter Permissions */}
        <div id="matter-permissions" className="section">
          <h2><FaLock /> Matter Permissions</h2>
          <TextField label="Firm Users with Access" fullWidth />
        </div>

        {/* Matter Notifications */}
        <div id="matter-notifications" className="section">
          <h2><FaBell /> Matter Notifications</h2>
          <TextField label="Firm User to Notify" fullWidth />
        </div>

        {/* Custom Fields */}
        <div id="custom-fields" className="section">
          <h2><FaTags /> Custom Fields</h2>
          <Button variant="contained" color="primary">Add Custom Field</Button>
        </div>

        {/* Billing Preference */}
        <div id="billing-preference" className="section">
          <h2><FaMoneyBillWave /> Billing Preferences</h2>
          <FormControl fullWidth>
            <InputLabel>Billing Method</InputLabel>
            <Select defaultValue="Hourly">
              <MenuItem value="Hourly">Hourly</MenuItem>
              <MenuItem value="Flat Rate">Flat Rate</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Matter Budget" fullWidth />
          <FormControlLabel
            control={
              <Checkbox
                checked={isBillable}
                onChange={() => setIsBillable(!isBillable)}
              />
            }
            label="This matter is billable"
          />
        </div>

        {/* Mention User */}
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

        {/* Create Matter Button */}
        <Button
          className="create-matter-btn"
          variant="contained"
          onClick={handleCreateMatter}
          style={{ marginTop: '30px', padding: '15px 30px', fontWeight: 'bold' }}
        >
          Create Matter
        </Button>
      </div>
    </div>
  );
};

export default MatterCreation;
