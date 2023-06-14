import {useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import {useContext} from 'react';

const Navbar = () => {
  const {user} = useContext(UserContext);
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div id="nav-container">
      <nav>
        {loggedIn ? (
          <ul className="nav-item">
            <li>
              <Link to={'/profile/'}>Profile</Link>
            </li>
            <li>Study</li>
            <li>Logout</li>
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
      Current user is: {user.name}
    </div>
  );
};
export default Navbar;
