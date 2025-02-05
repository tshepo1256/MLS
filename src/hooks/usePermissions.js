import { useAuthContext } from '../context/AuthContext';

export const usePermissions = () => {
  const { user } = useAuthContext();

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const isAdmin = () => {
    return hasPermission('ADMIN');
  };

  const canEditCase = (caseData) => {
    if (isAdmin()) return true;
    return caseData.assignedUsers.includes(user.id);
  };

  return {
    hasPermission,
    isAdmin,
    canEditCase,
  };
}; 