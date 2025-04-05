import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const togglableStyle = {
    maxHeight: visible ? "500px" : "0",
    opacity: visible ? 1 : 0,
    overflow: "hidden",
    transition: "max-height 0.5s ease-in-out, opacity 0.1s ease-in-out",
  };

  return (
    <div>
      <button className="btn btn-primary mb-4" onClick={toggleVisibility}>
        {visible ? "cancel" : "create new blog"}
      </button>
      <div style={togglableStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default Togglable;
