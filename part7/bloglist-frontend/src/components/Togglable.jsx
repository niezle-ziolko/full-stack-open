import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? 'cancel' : 'create new blog'}
      </button>
      {visible && <div>{props.children}</div>}
    </div>
  );
};

export default Togglable;
