import { Form } from 'react-router-dom';
import { useContext, useState, FormEvent } from 'react';
import { UserContext } from '../context/UserContext';

interface props {
  handleEditClick: () => void;
  editProfileActive: boolean;
}

type formData = {
  name: string;
  email: string;
  password: string;
};

const EditProfile = ({ handleEditClick, editProfileActive }: props) => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState<formData>({
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
    const apiUrlProxy = '/api/users/profile/';
    e.preventDefault();
    try {
      const res = await fetch(apiUrlProxy, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      if (updated._id) {
        setUser(updated);
      } else {
        alert(updated.message);
      }
    } catch (err) {
      console.error(err);
    }

    //clear form
    setFormData({
      name: '',
      email: '',
      password: '',
    });

    //close modal
    handleEditClick();
  };

  return (
    <div className={editProfileActive ? 'edit-profile active' : 'edit-profile'}>
      <div
        className={
          editProfileActive ? 'edit-profile-bg active' : 'edit-profile-bg'
        }
      ></div>
      <div
        className={
          editProfileActive ? 'edit-profile-box active' : 'edit-profile-box'
        }
      >
        <div className='edit-profile-header'>
          <h3>Edit your profile</h3>
          <button
            className='edit-close-profile'
            onClick={() => handleEditClick()}
          >
            X
          </button>
        </div>
        <div className='edit-profile-body'>
          <Form
            method='put'
            className='edit-profile-form'
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <label htmlFor='name'>Name (now {user.name})</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter new username'
              value={formData.name}
              onChange={e => {
                handleChange(e);
              }}
            />
            <label htmlFor='email'>Email (now {user.email})</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='enter new email'
              value={formData.email}
              onChange={e => {
                handleChange(e);
              }}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='enter new password'
              value={formData.password}
              onChange={e => {
                handleChange(e);
              }}
            />
            <button className='edit-profile-submit' type='submit'>
              Update{' '}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
