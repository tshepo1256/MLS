import {
    Add as AddIcon,
    Cancel,
    Link as LinkIcon,
    Save,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCaseContext } from '../../context/CaseContext';
import { useContactContext } from '../../context/ContactContext';
import './Contacts.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addContact, updateContact, contacts } = useContactContext();
  const { cases } = useCaseContext();
  const [linkCaseDialogOpen, setLinkCaseDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    position: '',
    notes: '',
    linkedCases: [],
    customFields: {},
  });

  const contactTypes = [
    { value: 'CLIENT', label: 'Client' },
    { value: 'WITNESS', label: 'Witness' },
    { value: 'OPPOSING_COUNSEL', label: 'Opposing Counsel' },
    { value: 'EXPERT', label: 'Expert Witness' },
    { value: 'JUDGE', label: 'Judge' },
    { value: 'OTHER', label: 'Other' },
  ];

  useEffect(() => {
    if (id) {
      const contact = contacts.find(c => c.id === parseInt(id));
      if (contact) {
        setFormData(contact);
      }
    }
  }, [id, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateContact(id, formData);
    } else {
      addContact(formData);
    }
    navigate('/contacts');
  };

  const handleLinkCase = (caseId) => {
    setFormData(prev => ({
      ...prev,
      linkedCases: [...prev.linkedCases, caseId],
    }));
    setLinkCaseDialogOpen(false);
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.type;
  };

  return (
    <Box className="contact-form-container">
      <Paper elevation={3} className="contact-form-paper">
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Contact' : 'Add New Contact'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Contact Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {contactTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Grid>

            {/* Professional Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Professional Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company/Organization"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position/Title"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </Grid>

            {/* Linked Cases */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Linked Cases
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => setLinkCaseDialogOpen(true)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {formData.linkedCases.map((caseId) => {
                  const linkedCase = cases.find(c => c.id === caseId);
                  return (
                    <Chip
                      key={caseId}
                      label={linkedCase?.reference || caseId}
                      onDelete={() => {
                        setFormData(prev => ({
                          ...prev,
                          linkedCases: prev.linkedCases.filter(id => id !== caseId),
                        }));
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>

            {/* Form Actions */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={() => navigate('/contacts')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={!validateForm()}
                >
                  {id ? 'Update Contact' : 'Save Contact'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Link Case Dialog */}
      <Dialog
        open={linkCaseDialogOpen}
        onClose={() => setLinkCaseDialogOpen(false)}
      >
        <DialogTitle>Link Case</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {cases
              .filter(c => !formData.linkedCases.includes(c.id))
              .map((case_) => (
                <Grid item xs={12} key={case_.id}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkIcon />}
                    onClick={() => handleLinkCase(case_.id)}
                  >
                    {case_.reference} - {case_.title}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkCaseDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactForm; 