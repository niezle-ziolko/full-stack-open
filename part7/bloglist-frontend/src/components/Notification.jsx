import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) return null;

  const notificationStyle = {
    color: notification.type === 'success' ? 'green' : 'red',
    border: `1px solid ${notification.type === 'success' ? 'green' : 'red'}`,
    padding: '10px',
    margin: '10px 0',
  };

  return (
    <div className={`notification ${notification.type}`} style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;