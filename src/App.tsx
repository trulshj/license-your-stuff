import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>License Your Stuff!</h1>
        <span>Check which repositories on a user's Github profile are licensed or not, most public things should be!<br />
        If you want to license <i>your</i> things, here is a helpful site to help you find the right one: <a href="https://choosealicense.com/" target="_blank" rel="noreferrer">choosealicense.com</a></span>
      </div>
      <SearchBar />
    </div>
  );
}

export default App;
