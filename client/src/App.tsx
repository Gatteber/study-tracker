import './style.scss';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {UserContext, User} from './context/UserContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [user, setUser] = useState<User>({_id: '', name: '', email: ''});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //check if cookie
  useEffect(() => {
    const checkIfCookie = async () => {
      const apiUrlProxy = '/api/users/profile';
      try {
        const fetchUser = await fetch(apiUrlProxy, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userCookieFound = await fetchUser.json();
        if (!userCookieFound._id) {
          setIsLoading(false);
          return;
        }
        setUser({
          _id: userCookieFound._id,
          name: userCookieFound.name,
          email: userCookieFound.email,
        });
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    checkIfCookie();
  }, []);
  return (
    <>
      <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Navbar />
            <Outlet />
          </>
        )}
      </UserContext.Provider>
    </>
  );
};
export default App;
