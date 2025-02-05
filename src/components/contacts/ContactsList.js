import {
    Add,
    Delete,
    Edit,
    Email,
    FilterList,
    MoreVert,
    Phone,
    Search,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactContext } from '../../context/ContactContext';
import './Contacts.css';

const ContactsList = () => {
  const navigate = useNavigate();
  const { contacts } = useContactContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const getTypeColor = (type) => {
    const colors = {
      'CLIENT': 'primary',
      'WITNESS': 'secondary',
      'OPPOSING_COUNSEL': 'warning',
      'EXPERT': 'info',
      'OTHER': 'default',
    };
    return colors[type] || 'default';
  };

  return (
    <Box className="contacts-container">
      <Paper elevation={3} className="contacts-header">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Contacts</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/contacts/new')}
            >
              Add Contact
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="contacts-filters">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search contacts..."
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} className="filter-buttons">
            <Button
              startIcon={<FilterList />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} className="contacts-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <Chip
                    label={contact.type}
                    color={getTypeColor(contact.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email fontSize="small" color="action" />
                    {contact.email}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone fontSize="small" color="action" />
                    {contact.phone}
                  </Box>
                </TableCell>
                <TableCell>{contact.address}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, contact)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate(`/contacts/${selectedContact?.id}/edit`)}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => window.location.href = `mailto:${selectedContact?.email}`}>
          <Email sx={{ mr: 1 }} /> Send Email
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem>Type</MenuItem>
        <MenuItem>Recent</MenuItem>
        <MenuItem>Related Cases</MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography>
            Are you sure you want to delete this contact? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                // Handle delete
                setDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ContactsList; 