# Express Project README

## Overview

This project is a simple Express application that manages users and their messages using various RESTful endpoints. It includes functionalities to create, retrieve, update, and delete users and their messages.

## Getting Started

To run this application, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the server by running `node <your_script_name>.js`.

## Project Structure

### Dependencies

- **Express**: Web framework for Node.js used for building APIs.
- **Cors**: Middleware for enabling CORS in the Express app.
- **Bcrypt**: Library for hashing passwords securely.
- **Crypto**: Node.js built-in module for cryptographic operations.
- **JsonWebToken (JWT)**: For handling JSON Web Tokens.

### Scripts

- `node <your_script_name>.js`: Start the Express server.

### Endpoints

#### Users

- `POST /final-project/add-user`: Create a new user.
- `GET /final-project/list-users`: Retrieve the list of all users.
- `GET /final-project/view-user?id=<user_id>`: Get details of a specific user.
- `PUT /final-project/edit-user`: Update user information.
- `DELETE /final-project/delete-user?id_user=<user_id>`: Delete a user.

#### Messages

- `POST /final-project/add-message`: Add a message to a user.
- `GET /final-project/list-messages/:id?`: Get messages of a specific user.
- `GET /final-project/view-message?id_user=<user_id>&id_message=<message_id>`: View a specific message of a user.
- `PUT /final-project/edit-message`: Update a message of a user.
- `DELETE /final-project/delete-message?id_user=<user_id>&id_message=<message_id>`: Delete a message of a user.

## Usage

- **Users**: Perform CRUD operations on users. Create, retrieve, update, and delete user information.
- **Messages**: Manage messages associated with users. Add, view, edit, and delete messages.
