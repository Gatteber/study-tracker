import Navbar from './components/Navbar';
import './style.scss';
import {Outlet} from 'react-router-dom';
import {useState} from 'react';
import {UserContext} from './context/UserContext';

const App = () => {
  const [user, setUser] = useState({_id: '', name: '', email: ''});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        <Navbar />
        <Outlet />
      </UserContext.Provider>
    </>
  );
};
export default App;
