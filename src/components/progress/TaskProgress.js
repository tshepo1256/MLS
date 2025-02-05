import {
    AccessTime,
    AttachFile,
    Comment,
    MoreVert,
    Person,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';

const TaskProgress = ({ task }) => {
  const { trackProgress, realTimeUpdates } = useProgress();
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentDialog, setCommentDialog] = useState(false);
  const [comment, setComment] = useState('');

  const currentProgress = realTimeUpdates[task.id]?.progress || task.progress;

  const handleProgressUpdate = (newProgress) => {
    trackProgress(task.id, newProgress);
    setAnchorEl(null);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      trackProgress(task.id, {
        ...task,
        comments: [...(task.comments || []), {
          text: comment,
          timestamp: new Date(),
          user: 'Current User', // Replace with actual user
        }]
      });
      setComment('');
      setCommentDialog(false);
    }
  };

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{task.title}</Typography>
          <Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleProgressUpdate(25)}>25% Complete</MenuItem>
              <MenuItem onClick={() => handleProgressUpdate(50)}>50% Complete</MenuItem>
              <MenuItem onClick={() => handleProgressUpdate(75)}>75% Complete</MenuItem>
              <MenuItem onClick={() => handleProgressUpdate(100)}>Mark as Complete</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={currentProgress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: currentProgress === 100 ? '#4caf50' : '#1976d2',
              }
            }}
          />
          <Typography 
            variant="body2" 
            color="textSecondary" 
            align="right"
            sx={{ mt: 1 }}
          >
            {currentProgress}% Complete
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Chip
            icon={<AccessTime />}
            label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
            variant="outlined"
          />
          <Chip
            icon={<Person />}
            label={task.assignedTo}
            avatar={<Avatar>{task.assignedTo[0]}</Avatar>}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<Comment />}
            variant="outlined"
            size="small"
            onClick={() => setCommentDialog(true)}
          >
            Add Comment
          </Button>
          <Button
            startIcon={<AttachFile />}
            variant="outlined"
            size="small"
          >
            Attach File
          </Button>
        </Box>

        {/* Comments Dialog */}
        <Dialog
          open={commentDialog}
          onClose={() => setCommentDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialog(false)}>Cancel</Button>
            <Button onClick={handleCommentSubmit} variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TaskProgress; 