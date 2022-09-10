import './App.css';
import { ShortenURL } from './components/URL/Shorten';
import { useState } from 'react';
import { URL } from './components/URL/URL';
import { URLList } from './components/URL/URLList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Registeration/Login';
import SignUp from './components/Registeration/Signup';
import { Navbar } from './components/Navbar/Navbar';
import { useLocation } from 'react-router-dom'
import { ProtectedRoute, ProtectRegisterationRoute } from './components/Protection/ProtectedRoute';
import { Redirect } from './components/URL/Redirect';
import Logout from './components/Registeration/Logout';
import Search from './components/Search/Search';

function App() {

  const isAuthenticated = localStorage.getItem('isAuthenticated') ? true : false;
  const user = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : null;
  const [URLCategory, setURLCategory] = useState('None');
  const [URLTitle, setURLTitle] = useState('');
  const [userInfo, setUserInfo] = useState(user);
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const location = useLocation();

  const handleCategoryChange = (event) => {
    setURLCategory(event.target.value);
  }

  const handleURLTitleInput = (event) => {
    setURLTitle(event.target.value);
  }

  return (
    <div className="App">
      <Navbar username={userInfo ? userInfo.username.toUpperCase() : 'B'} isAuth={isAuth} />
      <Routes>
        <Route exact path='/login' element={
          <ProtectRegisterationRoute path={location.pathname} child={
            <Login setUserInfo={setUserInfo} setIsAuth={setIsAuth} />
          } />
        } />

        <Route exact path='/logout' element={
          <ProtectedRoute path={location.pathname} child={
            <Logout setIsAuth={setIsAuth} />
          } />
        } />

        <Route exact path='/signup' element={
          <ProtectRegisterationRoute path={location.pathname} child={
            <SignUp />
          } />
        } />

        <Route exact path='/' element={
          <ShortenURL URLTitle={URLTitle} setURLTitle={handleURLTitleInput}
            URLCategory={URLCategory} setURLCategory={handleCategoryChange} />
        } />

        <Route exact path='my/urls' element={
          <ProtectedRoute child={
            <URLList />
          } />
        } />

        <Route path='my/urls/:id' element={
          <URL isAuth={isAuth} currentUserID={userInfo?.id} />
        } />

        <Route path='search/:query' element={
          <Search />
        } />

        <Route path='/:id' element={
          <Redirect />
        } />
      </Routes>
    </div>
  );
}

export default App;
