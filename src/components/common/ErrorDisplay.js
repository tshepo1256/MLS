import { Error, Refresh } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

const ErrorDisplay = ({ error, onRetry, fullPage = false }) => {
  const content = (
    <Paper
      sx={{
        p: 3,
        textAlign: 'center',
        backgroundColor: 'error.light',
        color: 'error.contrastText',
      }}
    >
      <Error sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {error?.message || 'An error occurred'}
      </Typography>
      {error?.details && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          {error.details}
        </Typography>
      )}
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{
            mt: 2,
            backgroundColor: 'error.dark',
            '&:hover': {
              backgroundColor: 'error.main',
            },
          }}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );

  if (fullPage) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Box sx={{ maxWidth: 500, width: '100%' }}>{content}</Box>
      </Box>
    );
  }

  return content;
};

export default ErrorDisplay; 