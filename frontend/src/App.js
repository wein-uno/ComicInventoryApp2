import React from 'react';

import ComicList from './components/ComicList';
import ComicForm from './components/ComicForm';
//import HomePage from './components/HomePage';

//this is where it puts the sections on the page
function App() {
  return (
    <div>
      <h1>Comic Inventory</h1>

      <ComicForm />

      <ComicList />
    </div>
  );
}

export default App;
