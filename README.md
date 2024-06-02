# User Management React App

This is a simple user management application built with React. It allows you to view, create, edit, and delete user details. The app interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations on user data stored in a MongoDB database.

## Features

- **View Users**: Displays a list of users fetched from the backend API.
- **Create User**: Allows adding a new user through a form.
- **Edit Users**: Allows editing user details directly within the list and updates the changes to the backend API.
- **Delete Users**: Provides the functionality to delete a user from the list and the backend API.

## How It Works

### Components

- **UserList**: This component fetches the user data from the backend API and displays it in a table format. It provides buttons for editing and deleting each user, and a form to add a new user.

### API Endpoints

The app interacts with the following API endpoints:

- **Fetch Users**: `GET https://localhost:7255/api/user`
- **Create User**: `POST https://localhost:7255/api/user`
- **Update User**: `PUT https://localhost:7255/api/user/{id}`
- **Delete User**: `DELETE https://localhost:7255/api/user/{id}`

### Functionality

- **Fetch Users**: When the app loads, it sends a GET request to the backend API to fetch all user details and display them in a table.
- **Create User**: A form is provided to input new user details. Upon submission, a POST request is sent to the backend API to create a new user.
- **Edit Users**: When the "Edit" button is clicked, input fields are displayed to allow modification of the user's details. Upon submission, a PUT request is sent to the backend API to update the user's information.
- **Delete Users**: When the "Delete" button is clicked, a DELETE request is sent to the backend API to remove the user from the database. The user is then removed from the displayed list.

## Running the App

### Prerequisites

- Node.js and npm installed on your machine.
- Backend API running and accessible at `https://localhost:7255`.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/user-management-react-app.git
    cd user-management-react-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

### Backend API

Ensure your backend API is running and accessible at `https://localhost:7255`. You can refer to the backend repository [here](https://github.com/geekyharsh01/UserApi) for setup instructions.


