import {
    Add,
    Category,
    Delete,
    Description,
    Edit,
    FileCopy,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './Documents.css';

const DocumentTemplates = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock template categories
  const categories = [
    'Court Documents',
    'Contracts',
    'Letters',
    'Pleadings',
    'Affidavits',
    'Motions',
  ];

  // Mock templates
  const templates = [
    {
      id: 1,
      name: 'Notice of Motion',
      category: 'Motions',
      description: 'Standard notice of motion template',
      variables: ['case_number', 'client_name', 'court_name', 'hearing_date'],
      content: '...',
    },
    {
      id: 2,
      name: 'Client Engagement Letter',
      category: 'Letters',
      description: 'Standard client engagement letter',
      variables: ['client_name', 'matter_description', 'fee_structure'],
      content: '...',
    },
  ];

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setOpenDialog(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  return (
    <Box className="templates-container">
      <Paper elevation={3} className="templates-header">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Document Templates</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateTemplate}
            >
              Create Template
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Categories Section */}
        <Grid item xs={12} md={3}>
          <Paper className="categories-paper">
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItem button key={category}>
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Templates List */}
        <Grid item xs={12} md={9}>
          <Paper className="templates-list">
            <List>
              {templates.map((template) => (
                <ListItem key={template.id}>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={template.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {template.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {template.variables.map((variable) => (
                            <Chip
                              key={variable}
                              label={variable}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEditTemplate(template)}>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <FileCopy />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Template Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {selectedTemplate ? 'Edit Template' : 'Create Template'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Template Name"
                defaultValue={selectedTemplate?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  defaultValue={selectedTemplate?.category || ''}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                defaultValue={selectedTemplate?.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={12}
                label="Template Content"
                defaultValue={selectedTemplate?.content}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Save Template
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DocumentTemplates; 