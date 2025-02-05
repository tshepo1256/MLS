import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { BillingProvider } from './context/BillingContext';
import { CalendarProvider } from './context/CalendarContext';
import { CaseProvider } from './context/CaseContext';
import { ContactProvider } from './context/ContactContext';
import { DocumentProvider } from './context/DocumentContext';
import { LoadingProvider } from './context/LoadingContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes';
import './styles/global.css';

function App() {
  useEffect(() => {
    document.title = 'MLS - Legal Management System';
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <CssBaseline />
          <LoadingProvider>
            <AuthProvider>
              <NotificationProvider>
                <ContactProvider>
                  <CalendarProvider>
                    <CaseProvider>
                      <DocumentProvider>
                        <BillingProvider>
                          <MainLayout>
                            <AppRoutes />
                          </MainLayout>
                        </BillingProvider>
                      </DocumentProvider>
                    </CaseProvider>
                  </CalendarProvider>
                </ContactProvider>
              </NotificationProvider>
            </AuthProvider>
          </LoadingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
