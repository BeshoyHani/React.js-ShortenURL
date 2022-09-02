import './App.css';
import { ShortenURL } from './components/URL/Shorten';
import { useState, useEffect } from 'react';
import { URL } from './components/URL/URL';
import { URLList } from './components/URL/URLList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Registeration/Login';
import SignUp from './components/Registeration/Signup';
import { Navbar } from './components/Navbar/Navbar';
import { useLocation } from 'react-router-dom'
import { ProtectedRoute, ProtectRegisterationRoute } from './components/Protection/ProtectedRoute';
import { Redirect } from './components/URL/Redirect';

function App() {

  const [URLCategory, setURLCategory] = useState('None');
  const [URLTitle, setURLTitle] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  const handleCategoryChange = (event) => {
    setURLCategory(event.target.value);
  }

  const handleURLTitleInput = (event) => {
    setURLTitle(event.target.value);
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/login' element={
          <ProtectRegisterationRoute path={location.pathname} child={
            <Login setUserInfo={setUserInfo} />
          } />
        } />

        <Route exact path='/signup' element={
          <ProtectRegisterationRoute path={location.pathname} child={
            <SignUp />
          } />
        } />

        <Route exact path='/' element={
          <ProtectedRoute child={
            <ShortenURL URLTitle={URLTitle} setURLTitle={handleURLTitleInput}
              URLCategory={URLCategory} setURLCategory={handleCategoryChange} />
          } />
        } />

        <Route exact path='my/urls' element={
          <ProtectedRoute child={
            <URLList />
          } />
        } />

        <Route path='my/urls/:id' element={
            <URL />
        } />

        <Route path='/:id' element={
            <Redirect/>
        } />
      </Routes>
    </div>
  );
}

export default App;
