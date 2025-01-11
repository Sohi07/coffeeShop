import React, { useEffect } from "react";

const DynamicText = ({ text }) => {
  useEffect(() => {
    const textElement = document.getElementById("text");
    if (textElement) {
      textElement.textContent = text;
    }
  }, [text]);
  return (
    <div className="typing">
      <span id="text"></span>
      <div className="cursor"></div>
    </div>
  );
};

export default DynamicText;
