import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { loading } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your password reset API here
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  if (submitted) {
    return (
      <Box className="auth-container">
        <Paper elevation={3} className="auth-paper">
          <Typography variant="h5" align="center" gutterBottom>
            Check Your Email
          </Typography>
          <Typography align="center" paragraph>
            If an account exists for {email}, you will receive password reset instructions.
          </Typography>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Return to Login
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Enter your email address and we'll send you instructions to reset your password.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Instructions
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword; 