import React, { useState } from 'react';
import axios from 'axios';

const ComicForm = () => {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('number', number);
    formData.append('grade', grade);
    formData.append('value', value);
    formData.append('image', image);

    await axios.post('http://localhost:5000/api/comics', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setTitle('');
    setNumber('');
    setGrade('');
    setValue('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Number" required />
      <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" required />
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Comic</button>
    </form>
  );
};

export default ComicForm;
