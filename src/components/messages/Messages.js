import {
  Avatar,
  Box,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  AttachFile,
  Delete,
  Edit,
  Forward,
  MoreVert,
  Reply,
  Send,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { getMockData } from '../../mock/mockData';
import { format } from 'date-fns';

const Messages = () => {
  const theme = useTheme();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messages = getMockData('messages');

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)', gap: 2, p: 2 }}>
      {/* Messages List */}
      <Paper
        elevation={3}
        sx={{
          width: 320,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Messages
          </Typography>
        </Box>
        <List sx={{ overflow: 'auto', flex: 1 }}>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItemButton
                selected={selectedMessage?.id === message.id}
                onClick={() => handleMessageSelect(message)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    {message.sender[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.subject}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {message.sender}
                      </Typography>
                      {' - '}
                      {format(new Date(message.timestamp), 'MMM d, yyyy')}
                    </>
                  }
                />
              </ListItemButton>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Message Content */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedMessage ? (
          <>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">{selectedMessage.subject}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {selectedMessage.sender[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {selectedMessage.sender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(
                        new Date(selectedMessage.timestamp),
                        'MMM d, yyyy h:mm a'
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton>
                    <Reply />
                  </IconButton>
                  <IconButton>
                    <Forward />
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
              <Typography>{selectedMessage.content}</Typography>
              {selectedMessage.attachments?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Attachments
                  </Typography>
                  <List>
                    {selectedMessage.attachments.map((attachment) => (
                      <ListItem
                        key={attachment.id}
                        sx={{
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <AttachFile />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={attachment.name}
                          secondary={attachment.size}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                display: 'flex',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Type your reply..."
                value={newMessage}
                onChange={handleNewMessageChange}
                variant="outlined"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <Edit />
                </IconButton>
                <Fab
                  color="primary"
                  size="small"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send />
                </Fab>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Select a message to view
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Messages; 