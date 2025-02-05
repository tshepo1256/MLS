import { Add, Delete, Edit, Person } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

const CaseParties = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [parties, setParties] = useState({
    plaintiffs: [
      { id: 1, name: 'John Doe', type: 'Individual', role: 'Plaintiff', contact: '+27123456789' }
    ],
    defendants: [
      { id: 2, name: 'ABC Corporation', type: 'Company', role: 'Defendant', contact: '+27987654321' }
    ],
    witnesses: [
      { id: 3, name: 'Jane Smith', type: 'Individual', role: 'Witness', contact: '+27456789123' }
    ]
  });

  const handleAddParty = () => {
    setSelectedParty(null);
    setOpenDialog(true);
  };

  const PartySection = ({ title, parties, role }) => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {parties.map((party) => (
          <ListItem key={party.id} divider>
            <Person sx={{ mr: 2 }} />
            <ListItemText
              primary={party.name}
              secondary={`${party.type} • ${party.contact}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddParty}
          sx={{ mb: 3 }}
        >
          Add Party
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <PartySection
          title="Plaintiffs"
          parties={parties.plaintiffs}
          role="Plaintiff"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <PartySection
          title="Defendants"
          parties={parties.defendants}
          role="Defendant"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <PartySection
          title="Witnesses"
          parties={parties.witnesses}
          role="Witness"
        />
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedParty ? 'Edit Party' : 'Add New Party'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Add form fields here */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CaseParties; 