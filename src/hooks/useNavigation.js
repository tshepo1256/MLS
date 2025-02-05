import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = useCallback(async (path, options = {}) => {
    try {
      if (options.loading) {
        showLoading(options.loadingMessage || 'Loading...');
      }
      
      // If there's a validation function, run it before navigation
      if (options.validate) {
        const isValid = await options.validate();
        if (!isValid) return;
      }

      // Handle any cleanup before navigation
      if (options.onBeforeNavigate) {
        await options.onBeforeNavigate();
      }

      navigate(path, {
        replace: options.replace,
        state: options.state,
      });

      // Handle any actions after navigation
      if (options.onAfterNavigate) {
        await options.onAfterNavigate();
      }
    } catch (error) {
      console.error('Navigation error:', error);
      if (options.onError) {
        options.onError(error);
      }
    } finally {
      if (options.loading) {
        hideLoading();
      }
    }
  }, [navigate, showLoading, hideLoading]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  return {
    navigate: navigateWithLoading,
    goBack,
    goForward,
    currentPath: location.pathname,
    location,
  };
}; 