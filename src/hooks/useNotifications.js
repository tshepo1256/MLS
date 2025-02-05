import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info') => {
    enqueueSnackbar(message, { variant: type });
  }, [enqueueSnackbar]);

  const showSuccess = useCallback((message) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showError = useCallback((message) => {
    showNotification(message, 'error');
  }, [showNotification]);

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
  };
}; 