import React, { useState } from 'react';
import axios from 'axios';

const ComicForm = () => {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null); //null vs '' because of its type, blob
  const [error, setError] = useState(''); //hopefully error free but this will help with getting good message

  const handleSubmit = async (e) => {
    e.preventDefault();

// basic validation for comic number - there are 1/2, lots of 0 and small number of 1,000,000
    if (number < 0 || number > 1000001) {
        setError('Number must be between 0 and 1,000,001.');  //returns message
        return;
      }
  
    if (value < 0 || value > 10000000) {
        setError('Value must be between 0 and 10,000,000.'); //currently the most expensive book has been under 10million
        return;
      }
  
      setError(''); //blanks the message

    const formData = new FormData();
    formData.append('title', title);
    formData.append('number', number);
    formData.append('grade', grade);
    formData.append('value', value);
    formData.append('image', image);

    try {
        const response = await axios.post('http://localhost:5000/api/comics', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Comic added:', response.data);
        // Reset form or handle success state
      } catch (err) {
        console.error('Error adding comic:', err.response.data);
        if (err.response && err.response.data.errors) {
          // Display backend validation errors
          setError(err.response.data.errors.map(er => er.msg).join(', '));
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" required 
        />
        <input 
          type="number" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
          placeholder="Number (0 to 1,000,001)" 
          required 
        />
        <input 
          type="text" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          placeholder="Grade" 
          required 
        />
        <input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Value (0 to 10,000,000)" 
          step="0.01"
          required 
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
        />
        <button type="submit">Add Comic</button>
      </form>
    );
  };
  
  export default ComicForm;
