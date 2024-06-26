import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './userList.css'; // Import the CSS file

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        Email: '',
        Location: ''
    });

    useEffect(() => {
        // Function to fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7255/api/user');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error: for example, you could set a state indicating the error and display a message to the user
            }
        };

        fetchUsers(); // Fetch users on component mount
    }, []);

    // Function to handle edit button click
    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setFormData({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Address: user.Address,
            Email: user.Email,
            Location: user.Location
        });
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to handle form submission for updating a user
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { FirstName, LastName, Address, Email, Location } = formData;

        // Check for empty fields
        if (!FirstName || !LastName || !Address || !Email || !Location) {
            alert('All fields are required.');
            return;
        }

        // Check for valid email format
        if (!isValidEmail(Email)) {
            alert('Incorrect format of email.');
            return;
        }

        try {
            await axios.put(`https://localhost:7255/api/user/${editingUserId}`, formData);
            // Update the user list with the updated user data
            setUsers((prevUsers) => prevUsers.map((user) => (user.id === editingUserId ? { ...user, ...formData } : user)));
            setEditingUserId(null); // Reset editing user ID
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error: for example, you could display an error message to the user
        }
    };

    // Function to handle deletion of a user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7255/api/user/${id}`);
            // Remove the deleted user from the user list
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error: for example, you could display an error message to the user
        }
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <Link to="/" className="home-link">Home</Link>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            {editingUserId === user.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="FirstName"
                                            value={formData.FirstName}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Address"
                                            value={formData.Address}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Location"
                                            value={formData.Location}
                                            onChange={handleInputChange}
                                            className="input-field"
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleFormSubmit} className="submit-button">Submit</button>
                                        <button onClick={() => setEditingUserId(null)} className="cancel-button">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{user.FirstName}</td>
                                    <td>{user.LastName}</td>
                                    <td>{user.Address}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Location}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(user)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
