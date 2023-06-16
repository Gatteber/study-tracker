import {FormEvent, useState, useContext} from 'react';
import {Form, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {setUser, setIsLoggedIn} = useContext(UserContext);
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
    <>
      <Form
        className="signup-form"
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Username..."
          value={formData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email..."
          value={formData.email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password..."
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button type="submit" formAction="submit">
          Create Account!
        </button>
      </Form>
    </>
  );
};
export default Signup;
