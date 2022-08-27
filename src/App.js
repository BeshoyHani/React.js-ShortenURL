import './App.css';
import { ShortenURL } from './components/URL/Shorten';
import { useState } from 'react';
import { URL } from './components/URL/URL';
import { URLItem } from './components/URL/URLItem';
import { URLList } from './components/URL/URLList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Registeration/Login';
import SignUp from './components/Registeration/Signup';

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
    <div className="App">
      <Routes>
        <Route exact path='/login' element={
          <Login />
        } />

        <Route exact path='/signup' element={
          <SignUp />
        } />

        <Route exact path='/' element={
          <ShortenURL URLTitle={URLTitle} setURLTitle={handleURLTitleInput}
            URLCategory={URLCategory} setURLCategory={handleCategoryChange} />
        } />

        <Route exact path='my/urls' element={
          <URLList />
        } />

        <Route path='my/urls/:id' element={
          <URL />
        } />
      </Routes>
    </div>
  );
}

export default App;
