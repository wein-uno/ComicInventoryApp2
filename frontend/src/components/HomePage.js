import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [randomComic, setRandomComic] = useState(null);

  // Fetch a random comic from the database
  useEffect(() => {
    const fetchRandomComic = async () => {
      const response = await axios.get('http://localhost:5000/api/comics/random'); // You need to implement this endpoint in your backend
      setRandomComic(response.data);
    };

    fetchRandomComic();
  }, []);

  return (
    <div className="homepage-container">
      {/* Left Column (1/3 width) */}
      <div className="left-column">
        {/* Top Row: Buttons */}
        <div className="button-row">
          <button onClick={() => window.location.href='/add'}>Add New Comic</button>
          <button onClick={() => window.location.href='/edit'}>Edit Comic</button>
          <button onClick={() => window.location.href='/list'}>List Comics</button>
        </div>

        {/* Bottom Row: External link */}
        <div className="link-row">
          <a href="https://www.comic-cop.com" target="_blank" rel="noopener noreferrer">
            Visit Comic-Cop
          </a>
        </div>
      </div>

      {/* Right Column (2/3 width) */}
      <div className="right-column">
        {randomComic ? (
          <div className="random-comic">
            <h3>{randomComic.title} #{randomComic.number}</h3>
            <p>Grade: {randomComic.grade}</p>
            <p>Price: ${randomComic.value}</p>
            <img 
              src={randomComic.image ? `data:image/jpeg;base64,${randomComic.image}` : '/no-image.png'} 
              alt={randomComic.title}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <p>Loading random comic...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
