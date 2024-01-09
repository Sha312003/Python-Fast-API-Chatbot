// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchComponent = () => {
//   const [tags, setTags] = useState('');
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/search?tags=${tags}&query=${query}`);
//       setResults(response.data.results);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Tags:
//         <input
//           type="text"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           placeholder="Enter tags separated by commas"
//         />
//       </label>
//       <br />

//       <label>
//         Search:
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter your search query"
//         />
//       </label>
//       <br />

//       <button onClick={handleSearch}>Search</button>

//       <div>
//         {results.map((result) => (
//           <div key={result.id}>
//             <h3>{result.title}</h3>
//             {/* Add more details or customize the card as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;




import React, { useState } from 'react';
// import axios from 'axios';

const SearchComponent = ({ onSearch }) => {
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(tags, query);
  };

  return (
    <div>
      <label>
        Tags:
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas"
        />
      </label>
      <br />

      <label>
        Search:
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
      </label>
      <br />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
