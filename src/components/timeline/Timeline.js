import React from 'react';
import {
  Box,
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Event as EventIcon,
  Description as DocumentIcon,
  Gavel as GavelIcon,
  Comment as CommentIcon,
  AttachFile as AttachmentIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const mockTimelineData = {
  matter: [
  {
    id: 1,
      date: '2024-03-20',
      type: 'case_creation',
      title: 'Case Initiated',
      description: 'Case file created and initial documentation prepared',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=FF69B4&color=fff',
      },
      attachments: ['Initial_Filing.pdf'],
      status: 'completed',
  },
  {
    id: 2,
      date: '2024-03-22',
      type: 'document',
      title: 'Contract Review Completed',
      description: 'Initial contract review and annotations completed',
      user: {
        name: 'James Parker',
        avatar: 'https://ui-avatars.com/api/?name=James+Parker&background=9370DB&color=fff',
      },
      attachments: ['Contract_Review_Notes.pdf', 'Annotated_Contract.pdf'],
      status: 'completed',
  },
  {
    id: 3,
      date: '2024-03-25',
      type: 'court',
      title: 'Court Filing Scheduled',
      description: 'Initial court appearance scheduled',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=87CEEB&color=fff',
      },
      status: 'in_progress',
  },
  {
    id: 4,
      date: '2024-04-01',
      type: 'milestone',
      title: 'Discovery Phase',
      description: 'Begin discovery process and document collection',
      status: 'pending',
    },
  ],
  tasks: [
    {
      id: 1,
      date: '2024-03-20',
      type: 'task_created',
      title: 'Document Review Assignment',
      description: 'Assigned initial document review to legal team',
      status: 'completed',
    },
    // Add more task timeline items
  ],
  client: [
    {
      id: 1,
      date: '2024-03-20',
      type: 'meeting',
      title: 'Initial Client Consultation',
      description: 'Discussed case details and strategy with client',
      status: 'completed',
    },
    // Add more client timeline items
  ],
};

const getTimelineIcon = (type) => {
  switch (type) {
    case 'case_creation':
    case 'milestone':
      return <GavelIcon />;
    case 'document':
      return <DocumentIcon />;
    case 'court':
      return <GavelIcon />;
    case 'meeting':
      return <EventIcon />;
    case 'comment':
      return <CommentIcon />;
    default:
      return <EventIcon />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'primary';
    case 'pending':
      return 'warning';
    case 'overdue':
      return 'error';
    default:
      return 'default';
  }
};

const Timeline = ({ type = 'matter' }) => {
  const timelineData = mockTimelineData[type] || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Timeline
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stepper orientation="vertical">
          {timelineData.map((item) => (
            <Step key={item.id} active={true} completed={item.status === 'completed'}>
              <StepLabel
                StepIconComponent={() => (
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getTimelineIcon(item.type)}
                  </Avatar>
                )}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={new Date(item.date).toLocaleDateString()}
                      size="small"
                      icon={<EventIcon />}
                    />
                    <Chip
                      label={item.status.replace('_', ' ')}
                      size="small"
                      color={getStatusColor(item.status)}
                    />
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  {item.user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Avatar
                        src={item.user.avatar}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {item.user.name}
                  </Typography>
                    </Box>
                  )}
                  {item.attachments && item.attachments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {item.attachments.map((attachment, index) => (
                        <Chip
                          key={index}
                          icon={<AttachmentIcon />}
                          label={attachment}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                          onClick={() => {}}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button size="small">Add Comment</Button>
                  <Button size="small">Add Attachment</Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Card>
    </Box>
  );
};

export default Timeline; 