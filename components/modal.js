import React, { useEffect, useState } from "react";

const Modal = (props) => {
  const [display, toggleDisplay] = useState(props.toggle);

  useEffect(() => {
    toggleDisplay(props.toggle);
  }, [props.toggle]);

  return (
    <div
      className={
        display
          ? "absolute ml-32 mt-16 w-10/12 h-5/6 bg-white z-10"
          : "hidden ml-32 mt-16 w-10/12 h-5/6 bg-white z-10"
      }
      id="modalWindow"
    >
      {props.content}
    </div>
  );
};

export default Modal;
