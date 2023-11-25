
# Final Project - User Authentication and Messaging API

This project implements a user authentication and messaging API using Express.js and bcrypt for password hashing. It provides endpoints to register users, log in, manage users, and handle messages.

## Getting Started

To get this project running on your local machine, follow these steps:

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install`.

### Running the Server

Start the server by running:

```
yarn dev
```

The server will start on port `8080`.

## Endpoints

### Register a User

- **URL:** `/final-project/add-user`
- **Method:** `POST`
- **Description:** Register a new user with a unique email, name, and password.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "your_password"
  }
  ```
- **Response:** 
  - `201 Created` - User added successfully
  - `400 Bad Request` - If invalid or missing parameters

### Log In

- **URL:** `/final-project/login`
- **Method:** `POST`
- **Description:** Authenticate a user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "your_password"
  }
  ```
- **Response:** 
  - `201 Created` - User logged in successfully
  - `400 Bad Request` - If invalid or missing parameters or incorrect credentials

### View User Details

- **URL:** `/final-project/view-user?id=<user_id>`
- **Method:** `GET`
- **Description:** Retrieve details of a specific user by ID.
- **Response:** 
  - User details in JSON format
  - `400 Bad Request` - If the user is not found

... (Continue documenting other endpoints similarly)

## Contributing

Feel free to contribute to this project by opening issues or pull requests.

