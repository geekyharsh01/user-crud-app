import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userFormStyles.css'; // Import CSS file

const UserForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7255/api/user', user); 
      navigate('/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="location" value={user.location} onChange={handleChange} placeholder="Location" required />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/users')}>User List</button>
      </form>
    </div>
  );
};

export default UserForm;
