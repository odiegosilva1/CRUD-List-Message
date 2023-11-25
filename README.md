# CRUD List Message

## Description


Briefly describe your project here.

This project is a to-do list application built using Express.js for the backend API. It incorporates CRUD (Create, Read, Update, Delete) functionalities for managing tasks and also includes user authentication and registration features. Users can create, update, delete, and view their tasks through the API endpoints while ensuring secure access through user authentication.


## Installation

To install the dependencies required for this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install` or `yarn install`

## Endpoints

### Get User Data

- **Endpoint:** `/users`
- **Method:** GET
- **Description:** Retrieve data of all users.
- **Parameters:** None
- **Response:** JSON object containing user data.

### Edit User Messags

- **Endpoint:** `/users/:userId/messages/:messageId`
- **Method:** PUT
- **Description:** Edit a specific message of a user.
- **Parameters:**
  - `userId`: ID of the user
  - `messageId`: ID of the message
- **Request Body:** JSON object containing modified message data with the following format:
 json
  {
    "id": "messageId",
    "title": "New Title",
    "description": "New Description"
  }
