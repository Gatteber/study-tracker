import { FormEvent, useState, useContext } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

type formData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState<formData>({
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
    const apiUrlProxy = '/api/users/auth/';
    e.preventDefault();
    try {
      const res = await fetch(apiUrlProxy, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data._id) {
        setUser(data);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        //TODO: Make a toast
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }

    //clear form
    setFormData({
      email: '',
      password: '',
    });
  };
  return (
    <div className='outlet-content'>
      <div className='login-content'>
        <h1>Login to Study Tracker</h1>
        <div className='login-form-box'>
          <Form
            method='post'
            className='login-form'
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
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
              Log in!
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
