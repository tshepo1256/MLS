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
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import './Auth.css';

const Login = () => {
const theme = useTheme();
const navigate = useNavigate();
const location = useLocation();
const { login, loginWithGoogle, loginWithApple } = useAuthContext();
const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  email: 'mockuser@example.com',
  password: 'mockpassword123',
});

const [loginError, setLoginError] = useState('');

const validationSchema = {
  email: {
    required: 'Email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format',
  },
  password: {
    required: 'Password is required',
    validate: (value) =>
      value.length >= 8 ? '' : 'Password must be at least 8 characters',
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
  setLoginError('');
  
  if (validateForm(formData)) {
    try {
      await login(formData);
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    }
  }
};

const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle(); // Calls the mocked Google login function
    navigate('/');
  } catch (error) {
    console.error('Google login failed:', error);
  }
};

const handleAppleLogin = async () => {
  try {
    await loginWithApple(); // Calls the mocked Apple login function
    navigate('/');
  } catch (error) {
    console.error('Apple login failed:', error);
  }
};

return (
  <Box className="auth-container">
    <Paper elevation={3} className="auth-paper">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to MLS
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Legal Management System
      </Typography>

      {loginError && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {loginError}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </Box>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            className="social-button google"
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<AppleIcon />}
            onClick={handleAppleLogin}
            className="social-button apple"
          >
            Continue with Apple
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </Typography>
        </Box>
      </form>
    </Paper>
  </Box>
);
};

export default Login;
