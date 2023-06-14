import {FormEvent, useState} from 'react';
import {Form} from 'react-router-dom';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext';

type formData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {setUser, setIsLoggedIn} = useContext(UserContext);
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
      console.log(data);
      if (data._id) {
        setUser(data);
        setIsLoggedIn(true);
      } else {
        //login failed
        alert(data.message);
      }
    } catch (err) {
      //something bad went wrong
      console.error(err);
    }

    //clear form
    setFormData({
      email: '',
      password: '',
    });
  };
  return (
    <div>
      Login
      <Form
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
          Log in!
        </button>
      </Form>
    </div>
  );
};
export default Login;
