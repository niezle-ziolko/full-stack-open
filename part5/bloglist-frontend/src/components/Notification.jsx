import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    border: `1px solid ${type === 'success' ? 'green' : 'red'}`,
    padding: '10px',
    margin: '10px 0'
  };

  return (
    <div className={`notification ${type}`} style={notificationStyle}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']).isRequired
};

export default Notification;