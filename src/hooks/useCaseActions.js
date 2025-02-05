import { useCallback } from 'react';
import { useCaseContext } from '../context/CaseContext';
import { caseService } from '../services/api';
import { useNotifications } from './useNotifications';

export const useCaseActions = () => {
  const { setCases, setCurrentCase } = useCaseContext();
  const { showSuccess, showError } = useNotifications();

  const createCase = useCallback(async (caseData) => {
    try {
      const response = await caseService.createCase(caseData);
      showSuccess('Case created successfully');
      return response.data;
    } catch (error) {
      showError('Failed to create case');
      throw error;
    }
  }, [showSuccess, showError]);

  const updateCaseStatus = useCallback(async (caseId, status) => {
    try {
      const response = await caseService.updateCase(caseId, { status });
      showSuccess('Case status updated');
      return response.data;
    } catch (error) {
      showError('Failed to update case status');
      throw error;
    }
  }, [showSuccess, showError]);

  return {
    createCase,
    updateCaseStatus,
  };
}; 