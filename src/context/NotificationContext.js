import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'CASE_UPDATE',
      message: 'New document uploaded to Smith vs. Johnson case',
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: 'REMINDER',
      message: 'Hearing scheduled for tomorrow at 10:00 AM',
      read: false,
      timestamp: new Date().toISOString(),
    },
  ]);

  const addNotification = (notification) => {
    setNotifications([
      { 
        ...notification, 
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...notifications,
    ]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    unreadCount: notifications.filter(n => !n.read).length,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}; 