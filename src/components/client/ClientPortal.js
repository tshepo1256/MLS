import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import {
  Message as MessageIcon,
  AttachFile as AttachFileIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Download as DownloadIcon,
  VideoCall as VideoCallIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const mockClients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF69B4&color=fff',
    status: 'Active',
    nextMeeting: '2024-03-25T10:00:00',
    unreadMessages: 3,
    pendingDocuments: 2,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=9370DB&color=fff',
    status: 'Active',
    nextMeeting: '2024-03-26T14:30:00',
    unreadMessages: 1,
    pendingDocuments: 0,
  },
];

const mockDocuments = [
  {
    id: 1,
    title: 'Contract Review - March 2024',
    type: 'PDF',
    date: '2024-03-20',
    status: 'Pending Signature',
  },
  {
    id: 2,
    title: 'Settlement Agreement',
    type: 'DOCX',
    date: '2024-03-19',
    status: 'Signed',
  },
];

const ClientPortal = () => {
  const [selectedClient] = useState(mockClients[0]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Client Portal
      </Typography>

      <Grid container spacing={3}>
        {/* Client List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Active Clients
            </Typography>
            <List>
              {mockClients.map((client) => (
                <ListItem
                  key={client.id}
                  button
                  selected={client.id === selectedClient.id}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={client.avatar} alt={client.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={client.name}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={client.status}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                        {client.unreadMessages > 0 && (
                          <Chip
                            label={`${client.unreadMessages} new`}
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Client Details */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<MessageIcon />}
                  sx={{ flex: 1, maxWidth: 200 }}
                >
                  Send Message
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VideoCallIcon />}
                  sx={{ flex: 1, maxWidth: 200 }}
                >
                  Video Call
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ScheduleIcon />}
                  sx={{ flex: 1, maxWidth: 200 }}
                >
                  Schedule Meeting
                </Button>
              </Paper>
            </Grid>

            {/* Documents */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Recent Documents</Typography>
                  <Button startIcon={<AttachFileIcon />}>Upload New</Button>
                </Box>
                <List>
                  {mockDocuments.map((doc) => (
                    <React.Fragment key={doc.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            <AttachFileIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={doc.title}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Chip label={doc.type} size="small" />
                              <Typography variant="caption">
                                {new Date(doc.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <DownloadIcon />
                          </IconButton>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Grid>

            {/* Billing Summary */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaymentIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h6">Billing Summary</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Outstanding Balance
                      </Typography>
                      <Typography variant="h5" color="error.main">
                        $2,450.00
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Last Payment
                      </Typography>
                      <Typography variant="h5" color="success.main">
                        $1,200.00
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Next Due Date
                      </Typography>
                      <Typography variant="h5">
                        Apr 15, 2024
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientPortal; 