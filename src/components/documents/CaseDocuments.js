import { Box, Typography } from '@mui/material';
import React from 'react';
import DocumentManager from './DocumentManager';

const CaseDocuments = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Case Documents
      </Typography>
      <DocumentManager />
    </Box>
  );
};

export default CaseDocuments; 