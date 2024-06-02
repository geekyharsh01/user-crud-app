import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ user, onUserCreated, onUserUpdated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        location: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            await onUserUpdated(formData);
        } else {
            await onUserCreated(formData);
        }
        navigate('/users');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
