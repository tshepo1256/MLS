import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const mockUser = { 
  id: 1, 
  name: 'Mock User', 
  email: 'mockuser@example.com',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Mock+User'
};
const mockToken = 'mock-jwt-token-12345';

// Mock credentials for testing
const VALID_CREDENTIALS = {
  email: 'mockuser@example.com',
  password: 'mockpassword123'
};

const authService = {
  login: async (credentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate credentials
    if (credentials.email === VALID_CREDENTIALS.email && 
        credentials.password === VALID_CREDENTIALS.password) {
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { token: mockToken, user: mockUser };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    // Simulate a successful registration
    console.log('Mock registration:', userData);
    localStorage.setItem('token', mockToken);
    return { token: mockToken, user: mockUser };
  },

  loginWithGoogle: async (tokenId) => {
    // Simulate Google login
    console.log('Mock Google login:', tokenId);
    localStorage.setItem('token', mockToken);
    return { token: mockToken, user: mockUser };
  },

  loginWithApple: async (authorizationCode) => {
    // Simulate Apple login
    console.log('Mock Apple login:', authorizationCode);
    localStorage.setItem('token', mockToken);
    return { token: mockToken, user: mockUser };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token === mockToken && storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  },

  forgotPassword: async (email) => {
    console.log('Mock forgot password:', email);
    return { message: 'Mock forgot password email sent' };
  },

  resetPassword: async (token, newPassword) => {
    console.log('Mock reset password:', token, newPassword);
    return { message: 'Mock password reset successful' };
  },

  verifyEmail: async (token) => {
    console.log('Mock verify email:', token);
    return { message: 'Mock email verification successful' };
  },
};

// Mock Axios Interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Mock Axios error:', error);
    return Promise.reject(error);
  }
);

export default authService;
