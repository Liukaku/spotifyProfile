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
          ? "absolute top-0 left-0 md:ml-72 ml-5 md:mt-16 mt-5 md:w-8/12 w-11/12 md:h-5/6 h-auto  z-10 text-white rounded-md modalWindow  overflow-y-scroll border border-solid border-white"
          : "hidden ml-32 mt-16 w-10/12 h-5/6  z-10"
      }
      id="modalWindow"
    >
      {props.content}
    </div>
  );
};

export default Modal;
