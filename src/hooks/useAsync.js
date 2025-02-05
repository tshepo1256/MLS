import { useCallback, useState } from 'react';
import { useLoading } from '../context/LoadingContext';

export const useAsync = (asyncFunction, immediate = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  const execute = useCallback(
    async (...params) => {
      try {
        showLoading();
        setError(null);
        const result = await asyncFunction(...params);
        setData(result);
        return result;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        hideLoading();
      }
    },
    [asyncFunction, showLoading, hideLoading]
  );

  return {
    execute,
    data,
    error,
    setData,
    setError,
  };
}; 