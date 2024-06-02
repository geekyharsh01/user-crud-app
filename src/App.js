import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

const App = () => {
    // State to store the list of users and the user form for editing
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState(null);

    // Function to fetch the list of users from the server
    const fetchUsers = async () => {
        try {
            // Making GET request to fetch users
            const response = await axios.get('https://localhost:7255/api/user');
            // Setting the fetched users to state
            setUsers(response.data);
        } catch (error) {
            // Handling any errors that occur during the fetch operation
            console.error('Error fetching users:', error);
            // You can add further error handling logic here, like displaying an error message to the user
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle creation of a new user
    const handleUserCreated = async (newUser) => {
        try {
            // Making POST request to create a new user
            await axios.post('https://localhost:7255/api/user', newUser);
            // After successfully creating user, fetch the updated list of users
            fetchUsers();
        } catch (error) {
            // Handling any errors that occur during user creation
            console.error('Error creating user:', error);
            // You can add further error handling logic here
        }
    };

    // Function to handle updating an existing user
    const handleUserUpdated = async (updatedUser) => {
        try {
            // Making PUT request to update the user
            await axios.put(`https://localhost:7255/api/user/${updatedUser.id}`, updatedUser);
            // After successfully updating user, fetch the updated list of users
            fetchUsers();
        } catch (error) {
            // Handling any errors that occur during user update
            console.error('Error updating user:', error);
            // You can add further error handling logic here
        }
    };

    // Function to handle deleting a user
    const handleUserDelete = async (userId) => {
        try {
            // Making DELETE request to delete the user
            await axios.delete(`https://localhost:7255/api/user/${userId}`);
            // After successfully deleting user, fetch the updated list of users
            fetchUsers();
        } catch (error) {
            // Handling any errors that occur during user deletion
            console.error('Error deleting user:', error);
            // You can add further error handling logic here
        }
    };

    // Function to handle editing a user
    const handleUserEdit = (user) => {
        setUserForm(user);
    };

    return (
        <Router>
            <div className="App">
                <h1>User Management</h1>
                <Routes>
                    {/* Route to display list of users */}
                    <Route path="/users" element={<UserList users={users} onEdit={handleUserEdit} onDelete={handleUserDelete} />} />
                    {/* Route to display user form */}
                    <Route path="/" element={<UserForm user={userForm} onUserCreated={handleUserCreated} onUserUpdated={handleUserUpdated} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
