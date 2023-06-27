import { FormEvent, useState, useContext } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    const apiUrlProxy = '/api/users/';
    e.preventDefault();
    try {
      const createUser = await fetch(apiUrlProxy, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newUser = await createUser.json();
      if (newUser._id) {
        setUser(newUser);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        //account creation failed
        alert(newUser.message);
      }
    } catch (err) {
      console.error(err);
    }
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };
  return (
    <div className='outlet-content'>
      <div className='signup-content'>
        <h1>Sign up for Study Tracker</h1>
        <div className='signup-form-box'>
          <Form
            className='signup-form'
            method='post'
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <label htmlFor='name'>Username</label>
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='user username'
              placeholder='Enter your Username...'
              value={formData.name}
              onChange={e => {
                handleChange(e);
              }}
            />
            <br></br>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='user email-address'
              placeholder='Enter your Email...'
              value={formData.email}
              onChange={e => {
                handleChange(e);
              }}
            />
            <br></br>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              autoComplete='user password'
              placeholder='Enter your Password...'
              value={formData.password}
              onChange={e => {
                handleChange(e);
              }}
            />
            <br></br>
            <button type='submit' formAction='submit'>
              Create Account
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
