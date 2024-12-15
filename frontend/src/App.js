import React from 'react';
import ComicList from './components/ComicList';
import ComicForm from './components/ComicForm';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <h1>Comic Inventory</h1>
      <ComicForm />
      <br></br>
      <ComicList />
    </div>
  );
}

export default App;
