import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Logo from '../assets/Logo.png';

const Navbar: React.FC = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
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
    <>
      <div id='nav-container' className='nav-container'>
        <div className='nav-status'>
          <img src={Logo} alt='study tracker logo'></img>
          <span>
            {isLoggedIn ? `Logged in as: ${user.name}` : 'Not logged in'}
          </span>
        </div>
        <nav>
          {isLoggedIn ? (
            <ul className='nav-item'>
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
            <ul className='nav-item'>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/signup'}>Sign up</Link>
              </li>
              <li>
                <Link to={'/login'}>Log in</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};
export default Navbar;
