import React, { useState } from "react";
import "./UpdateToggle.scss";
const UpdateToggle = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);
  // Function to toggle the state
  const toggleMode = () => {
    const newValue = !isOn;
    setIsOn(newValue);

    console.log(`Mode updated: ${!isOn ? "ON" : "OFF"}`);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <button onClick={toggleMode} className={isOn ? "on" : "off"}>
      {isOn ? "ON" : " OFF"}
    </button>
  );
};

export default UpdateToggle;
