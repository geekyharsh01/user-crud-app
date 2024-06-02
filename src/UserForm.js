import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// UserForm component receives props: user (current user data), onUserCreated (function to handle user creation), onUserUpdated (function to handle user update)
const UserForm = ({ user, onUserCreated, onUserUpdated }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        location: ''
    });

    // Hook to navigate between routes
    const navigate = useNavigate();

    // Effect to update form data when user prop changes (useful for editing existing user)
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    // Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Updating formData state with new value
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // If user already has an id, it means it's an existing user being edited, else it's a new user being created
        if (formData.id) {
            // Call onUserUpdated function to update user
            await onUserUpdated(formData);
        } else {
            // Call onUserCreated function to create new user
            await onUserCreated(formData);
        }
        // Navigate back to users list after form submission
        navigate('/users');
    };

    // Form component with input fields for user data
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
