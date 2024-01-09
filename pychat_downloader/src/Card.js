import React from 'react';
// import axios from 'axios';

const Card = ({ heading, description, link }) => {
    const handleLinkClick = async() => {
        try {
          // Make a POST request to the backend endpoint
            const response = await fetch('http://localhost:8000/card_clicked/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ link }),
            });

            console.log(response);  // Handle the response as needed
        } catch (error) {
          console.error('Error making POST request:', error);
            }
        };
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' ,width: '1300px'}}>

            <a href='#' onClick={handleLinkClick}>
                <h3>{heading}</h3>
            </a>
            <p>{description}</p>
        </div>
    );
};

export default Card;    
