import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Assignment,
  AttachFile,
  Delete,
  Description,
  Edit,
  FileCopy,
  Folder,
  History,
  MoreVert,
  Share,
  Visibility,
} from '@mui/icons-material';
import { getMockData } from '../../mock/mockData';
import { format } from 'date-fns';

const DocumentSharing = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  const documents = getMockData('documents');
  const sharedDocuments = getMockData('sharedDocuments');

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'legal', label: 'Legal Documents' },
    { id: 'court', label: 'Court Documents' },
    { id: 'client', label: 'Client Documents' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event, document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    setShareDialogOpen(true);
    handleMenuClose();
  };

  const handleHistoryClick = () => {
    setHistoryDialogOpen(true);
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    if (!doc || !doc.category) return currentTab === 0;
    if (currentTab === 0) return true;
    return doc.category.toLowerCase() === categories[currentTab].id;
  });

  const renderShareDialog = () => (
    <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
      <DialogTitle>Share Document</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Recipients"
          fullWidth
          variant="outlined"
          placeholder="Enter email addresses"
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Permissions
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Chip label="View" onClick={() => {}} />
            </Grid>
            <Grid item>
              <Chip label="Comment" onClick={() => {}} />
            </Grid>
            <Grid item>
              <Chip label="Edit" onClick={() => {}} />
            </Grid>
          </Grid>
        </Box>
        <TextField
          margin="dense"
          label="Expiry Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => setShareDialogOpen(false)}>
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderHistoryDialog = () => (
    <Dialog
      open={historyDialogOpen}
      onClose={() => setHistoryDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Document History</DialogTitle>
      <DialogContent>
        {selectedDocument?.timeline && selectedDocument.timeline.length > 0 ? (
          <List>
            {selectedDocument.timeline.map((event) => (
              <ListItem key={event.id}>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText
                  primary={event.action || 'Unknown Action'}
                  secondary={
                    <>
                      {event.user || 'Unknown User'} - {formatDate(event.date)}
                      <br />
                      {event.details || 'No details available'}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No history available for this document
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setHistoryDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab key={category.id} label={category.label} />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredDocuments.map((document) => (
          <Grid item xs={12} md={6} lg={4} key={document.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Description color="primary" />
                    <Typography variant="h6">
                      {document.name || 'Untitled Document'}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, document)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {document.matter || 'No matter assigned'}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {Array.isArray(document.tags) && document.tags.map((tag) => (
                      <Grid item key={tag}>
                        <Chip
                          label={tag}
                          size="small"
                          sx={{ bgcolor: theme.palette.primary.light }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Uploaded by {document.uploadedBy || 'Unknown'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(document.uploadDate)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleShareClick}>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <FileCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Copy Link" />
        </MenuItem>
        <MenuItem onClick={handleHistoryClick}>
          <ListItemIcon>
            <History fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="History" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {renderShareDialog()}
      {renderHistoryDialog()}
    </Box>
  );
};

export default DocumentSharing; 