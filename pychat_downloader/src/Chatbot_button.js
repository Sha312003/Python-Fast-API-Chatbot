import React from 'react';
import './Chatbot_button.css'



const Chatbot_button = ({ url}) => {
  const handleButtonClick = () => {
    // Redirect to the specified URL when the button is clicked
    window.location.href = url;
  };

  return (
    <button className="circular-button" onClick={handleButtonClick}>
        <img src="C:/Users/dwive/Downloads/KBG_logo_Clear_Background.png" alt="Button Icon" className="button-icon" />
    </button>
  );
};

export default Chatbot_button;

