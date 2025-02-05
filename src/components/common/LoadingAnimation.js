import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

const LoadingAnimation = ({ message = 'Loading...', type = 'default' }) => {
  const animations = {
    default: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      },
      icon: <CircularProgress />,
    },
    pulse: {
      container: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      },
      icon: (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <CircularProgress size={24} />
        </motion.div>
      ),
    },
    dots: {
      container: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      },
      icon: (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                }}
              />
            </motion.div>
          ))}
        </Box>
      ),
    },
  };

  const { container, icon } = animations[type] || animations.default;

  return (
    <Box sx={container}>
      {icon}
      <Typography
        variant="body2"
        color="textSecondary"
        component={motion.div}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingAnimation; 