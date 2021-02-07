import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
