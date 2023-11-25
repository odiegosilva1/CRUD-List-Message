# Final Project - User Management API

This project is an API for user management and messaging. It provides endpoints for user registration, login, user information retrieval, user editing, user deletion, and messaging operations.

## Endpoints

### Add User

- **POST /final-project/add-user**
  - Creates a new user with a name, email, and password.

### Login

- **POST /final-project/login**
  - Allows users to log in by verifying their credentials.

### List Users

- **GET /final-project/list-users**
  - Returns the list of all registered users.

### View User

- **GET /final-project/view-user**
  - Displays details of a specific user based on the provided ID.

### Edit User

- **PUT /final-project/edit-user**
  - Enables the editing of an existing user's information.

### Delete User

- **DELETE /final-project/delete-user**
  - Removes a user from the list of registered users.

### Delete Message

- **DELETE /final-project/delete-message**
  - Deletes a specific message associated with a user.

### Messages Endpoint

- **GET /final-project/messages**
  - Returns a message indicating that Postman is running.

### Add

- **POST /final-project/add-message**
  - Adds a new message to the specified user.

### List Messages

- **GET /final-project/list-messages/:id?**
  - Returns the list of messages for a specific user based on the provided ID.

### View Message

- **GET /final-project/view-message**
  - Displays details of a specific message associated with a user.

### Edit Message

- **PUT /final-project/edit-message**
  - Modifies the details of a specific message associated with a user.

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): A library to help hash passwords.

## Usage

1. Install dependencies using `yarn install`.

2. Run the server with `yarn dev`.
3. Access the API using the specified endpoints.

Feel free to explore and contribute to this project! If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

---
