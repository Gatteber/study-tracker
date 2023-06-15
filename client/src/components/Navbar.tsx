import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';

const Navbar: React.FC = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const handleLogout = async () => {
    const apiUrlProxy = '/api/users/logout/';
    try {
      const res = await fetch(apiUrlProxy, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      //TODO: Set a toast or message on webpage
      console.log(data);
      setIsLoggedIn(false);
      setUser({
        _id: '',
        name: '',
        email: '',
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div id="nav-container">
      <nav>
        {isLoggedIn ? (
          <ul className="nav-item">
            <li>
              <Link to={'/profile/'}>Profile</Link>
            </li>
            <li>Study</li>
            <li>
              <Link
                to={'/'}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-item">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/signup'}>Sign Up</Link>
            </li>
            <li>
              <Link to={'/login'}>Log In</Link>
            </li>
          </ul>
        )}
      </nav>
      {isLoggedIn
        ? `Current user is: ${user.name}`
        : 'Hello, and welcome to StudyTracker!'}
    </div>
  );
};
export default Navbar;
