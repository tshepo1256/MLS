import {
    Apple as AppleIcon,
    Google as GoogleIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithApple } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validationSchema = {
    name: {
      required: 'Name is required',
      validate: (value) => 
        value.length >= 2 ? '' : 'Name must be at least 2 characters',
    },
    email: {
      required: 'Email is required',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format',
    },
    password: {
      required: 'Password is required',
      validate: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/\d/.test(value)) return 'Password must contain at least one number';
        if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        return '';
      },
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value) => 
        value === formData.password ? '' : 'Passwords do not match',
    },
  };

  const {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleChange,
  } = useFormValidation(validationSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        await register(formData);
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Join MLS Legal Management System
        </Typography>

        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, name: e.target.value });
            }}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, email: e.target.value });
            }}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, password: e.target.value });
            }}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => loginWithGoogle()}
              className="social-button google"
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<AppleIcon />}
              onClick={() => loginWithApple()}
              className="social-button apple"
            >
              Continue with Apple
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Register; 