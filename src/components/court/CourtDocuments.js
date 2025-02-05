import {
    Add,
    Delete,
    Description,
    Download,
    FilterList,
    Folder,
    Search,
    Share,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourtDocuments = () => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock court documents data
  const courtDocuments = [
    {
      id: 1,
      name: 'Notice of Motion - Smith vs. Johnson',
      type: 'Motion',
      caseRef: 'CASE-2024-001',
      dateSubmitted: '2024-03-15',
      status: 'Filed',
      category: 'Pleadings',
    },
    {
      id: 2,
      name: 'Affidavit - State vs. Williams',
      type: 'Affidavit',
      caseRef: 'CASE-2024-002',
      dateSubmitted: '2024-03-20',
      status: 'Pending',
      category: 'Evidence',
    },
  ];

  const documentCategories = [
    'All Documents',
    'Pleadings',
    'Motions',
    'Orders',
    'Judgments',
    'Evidence',
    'Correspondence',
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Filed': 'success',
      'Pending': 'warning',
      'Rejected': 'error',
      'Draft': 'default',
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">Court Documents</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/court/documents/new')}
            >
              New Document
            </Button>
          </Box>
        </Grid>

        {/* Search and Filters */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  startIcon={<FilterList />}
                  onClick={handleFilterClick}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Categories */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List>
              {documentCategories.map((category) => (
                <ListItem
                  button
                  key={category}
                  selected={category === 'All Documents'}
                >
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Documents List */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <List>
              {courtDocuments.map((doc) => (
                <ListItem
                  key={doc.id}
                  sx={{
                    mb: 2,
                    border: '1px solid #eee',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {doc.name}
                        </Typography>
                        <Chip
                          label={doc.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={doc.status}
                          size="small"
                          color={getStatusColor(doc.status)}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Case: {doc.caseRef}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Submitted: {new Date(doc.dateSubmitted).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" title="Download">
                      <Download />
                    </IconButton>
                    <IconButton size="small" title="Share">
                      <Share />
                    </IconButton>
                    <IconButton size="small" color="error" title="Delete">
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem>Status</MenuItem>
        <MenuItem>Document Type</MenuItem>
        <MenuItem>Date Range</MenuItem>
        <MenuItem>Case</MenuItem>
      </Menu>
    </Box>
  );
};

export default CourtDocuments; 