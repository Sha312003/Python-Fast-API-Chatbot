// import React from 'react';
// import SearchComponent from './SearchComponent';

// function App() {
//   return (
//     <div className="App">
//       <h1>Search App</h1>
//       <SearchComponent />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchComponent from './SearchComponent';
import Chatbot_button from './Chatbot_button';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');

  

  useEffect(() => {
    const fetchCards = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search?tags=${tags}&query=${query}`);
      setAllCards(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchCards()
  },[tags, query]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    setCurrentCards(allCards.slice(startIndex, endIndex));
  }, [currentPage, allCards, cardsPerPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allCards.length / cardsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (searchTags, searchQuery) => {
    setTags(searchTags);
    setQuery(searchQuery);
    setCurrentPage(1); // Reset page when performing a new search
  };

  return (
    <div className="App">
      <h1>Card Display</h1>
      <SearchComponent onSearch={handleSearch} />

      <div>
        {currentCards.map((card) => (
          <Card heading={card.title} description={card.description} link={card.link} />
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(allCards.length / cardsPerPage)}>
          Next
        </button>
      </div>
      <Chatbot_button/>
    </div>
  );
};

export default App;
