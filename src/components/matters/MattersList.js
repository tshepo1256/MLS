import {
    Add,
    Delete,
    Edit,
    FilterList,
    MoreVert,
    Search,
    Visibility,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaseContext } from '../../context/CaseContext';
import { useAsync } from '../../hooks/useAsync';
import ErrorDisplay from '../common/ErrorDisplay';
import LoadingAnimation from '../common/LoadingAnimation';
import './Matters.css';

const MattersList = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { cases, setCases } = useCaseContext();
  const { execute: fetchCases, error, loading } = useAsync(async () => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return cases;
  });

  useEffect(() => {
    fetchCases().catch(console.error);
  }, [fetchCases]);

  if (loading) {
    return <LoadingAnimation type="pulse" message="Loading matters..." />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={() => fetchCases()}
      />
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'success',
      'Pending': 'warning',
      'Closed': 'error',
      'On Hold': 'default',
    };
    return colors[status] || 'default';
  };

  const handleMenuOpen = (event, matter) => {
    setAnchorEl(event.currentTarget);
    setSelectedMatter(matter);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMatter(null);
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

  return (
    <Box className="matters-container">
      <Box className="matters-header">
        <Typography variant="h4">Matters</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/matters/new')}
        >
          New Matter
        </Button>
      </Box>

      <Paper className="matters-filters">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search matters..."
              InputProps={{
                startAdornment: <Search />,
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

      <TableContainer component={Paper} className="matters-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Next Hearing</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((matter) => (
              <TableRow key={matter.id} hover>
                <TableCell>{matter.reference}</TableCell>
                <TableCell>{matter.title}</TableCell>
                <TableCell>{matter.type}</TableCell>
                <TableCell>
                  <Chip
                    label={matter.status}
                    color={getStatusColor(matter.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{matter.client}</TableCell>
                <TableCell>{new Date(matter.nextHearing).toLocaleDateString()}</TableCell>
                <TableCell>{matter.assignedTo}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, matter)}>
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
        <MenuItem onClick={() => navigate(`/matters/${selectedMatter?.id}`)}>
          <Visibility sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={() => navigate(`/matters/${selectedMatter?.id}/edit`)}>
          <Edit sx={{ mr: 1 }} /> Edit
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
        <MenuItem>Status</MenuItem>
        <MenuItem>Type</MenuItem>
        <MenuItem>Assigned To</MenuItem>
        <MenuItem>Date Range</MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this matter? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => {
            // Handle delete
            setDeleteDialogOpen(false);
          }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MattersList; 