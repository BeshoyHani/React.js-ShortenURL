import './App.css';
import { ShortenURL } from './components/URL/Shorten';
import { useState } from 'react';
import { URL } from './components/URL/URL';

function App() {

  const [URLCategory, setURLCategory] = useState('None');
  const [URLTitle, setURLTitle] = useState('');

  const handleCategoryChange = (event) => {
    setURLCategory(event.target.value);
  }

  const handleURLTitleInput = (event) => {
    setURLTitle(event.target.value);
  }

  return (
    <div className="App">{/*
      <ShortenURL URLTitle={URLTitle} setURLTitle={handleURLTitleInput} URLCategory={URLCategory} setURLCategory={handleCategoryChange} />
    */}<URL />
    </div>
  );
}

export default App;
