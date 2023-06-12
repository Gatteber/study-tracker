import {useState} from 'react';

const Navbar = () => {
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <>
      {loggedIn ? (
        <ul className="test">
          <li>Profile</li>
          <li>Study</li>
          <li>Logout</li>
        </ul>
      ) : (
        <ul className="test">
          <li>Home</li>
          <li>Sign Up</li>
          <li>Log In</li>
        </ul>
      )}
    </>
  );
};
export default Navbar;
