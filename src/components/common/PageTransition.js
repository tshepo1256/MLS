import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

const PageTransition = ({ children }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Box>
  );
};

export default PageTransition; 