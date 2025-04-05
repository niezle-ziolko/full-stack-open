import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) return null;

  const alertClass = notification.type === "success" ? "alert alert-success" : "alert alert-danger";

  return (
    <div className={`container ${alertClass} my-3`} role="alert">
      {notification.message}
    </div>
  );
};

export default Notification;