import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import ComicList from './components/ComicList';
import ComicForm from './components/ComicForm';
//import './components/HomePage.css';  // Import the CSS file

const App = () => {
  return (
    <Router>

        <Routes>
          <Route exact path="/" element={<ComicList/>}/> //comiclist was homepage
        </Routes>
    </Router>
  );
}
export default App;
