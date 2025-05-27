// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import Notification from './Notification';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, text) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, text }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter(n => n.id !== id));
    }, 3500);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={{ minHeight: '140px' }}>
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          {notifications.map(n => (
            <Notification key={n.id} notificationType={n.type} notificationText={n.text} />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  );
}