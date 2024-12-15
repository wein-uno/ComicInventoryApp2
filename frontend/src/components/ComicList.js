import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Placeholder image URL or import a local image
const placeholderImage = '/100.png';

const ComicList = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      const response = await axios.get('http://localhost:5000/api/comics');
      setComics(response.data);
    };

    fetchComics();
  }, []);

  return (
    <div>
      <h2>Comic List</h2>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            <h3>{comic.title} #{comic.number}</h3>
            <p>Grade: {comic.grade}, Value: ${comic.value}</p>
            {/* Display the comic image or a placeholder */}
            <img 
              src={comic.image ? `data:image/jpeg;base64,${comic.image}` : placeholderImage}
              alt={comic.title}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;


