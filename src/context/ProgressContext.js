import React, { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const ProgressContext = createContext();

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

export const ProgressProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState({});
  const socket = io(SOCKET_URL);

  // Listen for real-time updates
  React.useEffect(() => {
    socket.on('taskProgress', (data) => {
      setRealTimeUpdates(prev => ({
        ...prev,
        [data.taskId]: data
      }));
    });

    socket.on('activityUpdate', (data) => {
      setActivities(prev => [data, ...prev]);
    });

    return () => {
      socket.off('taskProgress');
      socket.off('activityUpdate');
    };
  }, []);

  const trackProgress = (taskId, progress) => {
    socket.emit('updateProgress', { taskId, progress });
  };

  const logActivity = (activity) => {
    socket.emit('logActivity', activity);
  };

  return (
    <ProgressContext.Provider value={{
      activities,
      realTimeUpdates,
      trackProgress,
      logActivity
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 