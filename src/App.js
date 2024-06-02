import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState(null);

    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:7255/api/user');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = async (newUser) => {
        await axios.post('https://localhost:7255/api/user', newUser);
        fetchUsers();
    };

    const handleUserUpdated = async (updatedUser) => {
        await axios.put(`https://localhost:7255/api/user/${updatedUser.id}`, updatedUser);
        fetchUsers();
    };

    const handleUserDelete = async (userId) => {
        await axios.delete(`https://localhost:7255/api/user/${userId}`);
        fetchUsers();
    };

    const handleUserEdit = (user) => {
        setUserForm(user);
    };

    return (
        <Router>
            <div className="App">
                <h1>User Management</h1>
                <Routes>
                    <Route path="/users" element={<UserList users={users} onEdit={handleUserEdit} onDelete={handleUserDelete} />} />
                    <Route path="/" element={<UserForm user={userForm} onUserCreated={handleUserCreated} onUserUpdated={handleUserUpdated} />} />

                </Routes>
            
            </div>
        </Router>
    );
};

export default App;
