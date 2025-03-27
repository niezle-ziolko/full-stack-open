import React from 'react';

const Notification = ({ message, type }) => {
  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    border: `1px solid ${type === 'success' ? 'green' : 'red'}`,
    padding: '10px',
    margin: '10px 0'
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;