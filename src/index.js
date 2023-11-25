
import express from 'express';
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let usersList = [];
let counter = 0;
let messageCounter = 0;

app.post('/final-project/add-user', async (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.name === undefined || infoRequest.name === "") {
        return response.status(400).json("Provide a valid name");
    }

    if (infoRequest.email === undefined || infoRequest.email === "") {
        return response.status(400).json("Provide a valid email");
    }

    if (infoRequest.password === undefined || infoRequest.password === "") {
        return response.status(400).json("Provide a valid password");
    }

    let user = usersList.find(item => item.email == infoRequest.email);
    if (user) {
        return response.status(400).json("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(infoRequest.password, 6);

    const newUser = {
        id: ++counter,
        name: infoRequest.name,
        email: infoRequest.email,
        password: hashedPassword,
        messages: []
    }

    usersList.push(newUser);
    return response.status(201).json("User added successfully");
});

app.post('/final-project/login', async (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.email === undefined || infoRequest.email === "") {
        return response.status(400).json("Provide a valid email");
    }

    if (infoRequest.password === undefined || infoRequest.password === "") {
        return response.status(400).json("Provide a valid password");
    }

    let user = usersList.find(user => user.email == infoRequest.email);
    if (!user) {
        return response.status(400).json("Incorrect data");
    }

    const passwordCorrect = await bcrypt.compare(
        infoRequest.password,
        user.password
    );

    if (!passwordCorrect) {
        return response.status(400).json("Incorrect data");
    }

    return response.status(201).json("User logged in");
});

app.get('/final-project/list-users', (request, response) => {
    return response.json(usersList);
});

app.get('/final-project/view-user', (request, response) => {
    const parameters = request.query;

    let user = usersList.find(user => user.id == parameters.id);
    if (!user) {
        return response.status(400).json("User not found");
    }

    return response.json(user);
});

app.put('/final-project/edit-user', async (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.id === undefined || infoRequest.id === "") {
        return response.status(400).json("Provide a correct id");
    }

    if (infoRequest.name === undefined || infoRequest.name === "") {
        return response.status(400).json("Provide a valid name");
    }

    if (infoRequest.email === undefined || infoRequest.email === "") {
        return response.status(400).json("Provide a valid email");
    }

    if (infoRequest.password === undefined || infoRequest.password === "") {
        return response.status(400).json("Provide a valid password");
    }

    const hashedPassword = await bcrypt.hash(infoRequest.password, 6);

    const editedUser = {
        id: infoRequest.id,
        name: infoRequest.name,
        email: infoRequest.email,
        password: hashedPassword,
        messages: []
    }

    let index = usersList.findIndex(user => user.id == infoRequest.id);
    if (index === -1) {
        return response.status(400).json("Change the message");
    }

    usersList[index] = editedUser;
    return response.status(201).json("User edited successfully");
});

app.delete('/final-project/delete-user', (request, response) => {
    const parameters = request.query;
    const userId = parameters.id_user;
    let user = usersList.find(user => user.id == userId);

    if (!user) {
        return response.status(400).json("Invalid user");
    }

    usersList = usersList.filter(user => user.id != userId);
    return response.status(200).json('User deleted successfully');
});

app.delete('/final-project/delete-message', (request, response) => {
    const parameters = request.query;
    const messageId = parameters.id_message;
    const userId = parameters.id_user;

    let user = usersList.find(user => user.id == userId);

    if (!user) {
        return response.status(400).json("Invalid user");
    }

    let messageIndex = user.messages.findIndex(message => message.id == messageId);

    if (messageIndex === -1) {
        return response.status(400).json("Message not found");
    }

    user.messages = user.messages.filter(message => message.id != messageId);
    return response.status(200).json('Message deleted successfully');
});

app.get('/final-project/messages', (request, response) => {
    return response.json('Postman Running');
});

app.post('/final-project/add-message', (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.id_user === undefined || infoRequest.id_user === "") {
        return response.status(400).json("Provide a correct id");
    }

    if (infoRequest.title === undefined || infoRequest.title === "") {
        return response.status(400).json("Provide a valid title");
    }

    if (infoRequest.description === undefined || infoRequest.description === "") {
        return response.status(400).json("Provide a valid description");
    }

    let user = usersList.find(user => user.id == infoRequest.id_user);
    if (!user) {
        return response.status(400).json("Invalid user");
    }

    const newMessage = {
        id: ++messageCounter,
        title: infoRequest.title,
        description: infoRequest.description,
    }

    user.messages.push(newMessage);
    return response.status(201).json('The message "' + newMessage.description + '" was added successfully');
});


app.get('/final-project/list-messages/:id?', (request, response) => {
    const parameters = request.query;

    let user = usersList.find(item => item.id == parameters.id);
    if (user !== undefined) {
        return response.status(201).json(user.messages);
    } else {
        return response.status(201).json(parameters.id);
    }
});

app.get('/final-project/view-message', (request, response) => {
    const parameters = request.query;

    let user = usersList.find(user => user.id == parameters.id_user);
    if (!user) {
        return response.status(400).json("Message not found");
    }

    let message = user.messages.find(message => message.id == parameters.id_message);
    if (!message) {
        return response.status(400).json("Message not found");
    }

    return response.json(message);
});

app.put('/final-project/edit-message', async (request, response) => {
    const infoRequest = request

    if (infoRequest.id_user === undefined || infoRequest.id_user === "") {
        return response.status(400).json("Enter a correct id")
    }

    if (infoRequest.id_recado === undefined || infoRequest.id_recado === "") {
        return response.status(400).json("Enter a correct id");
    }

    if (infoRequest.titulo === undefined || infoRequest.titulo === "") {
        return response.status(400).json("Please enter a valid name");
    }

    if (infoRequest.descricao === undefined || infoRequest.descricao === "") {
        return response.status(400).json("Please provide a valid email");
    }

    const modifiedMessage = {
        id: infoRequest.id_recado,
        title: infoRequest.titulo,
        description: infoRequest.descricao,
    };

    let user = user_list.find(user => user.id == infoRequest.id_user);
    if (!user) {
        return response.status(400).json("Could not complete your request");
    }

    let index = user.messages.findIndex(message => message.id == infoRequest.id_recado);
    if (index === -1) {
        return response.status(400).json("Could not complete your request");
    }

    user.messages[index] = modifiedMessage;
    return response.status(201).json("Message edited successfully");
});

app.listen(8080, () => console.log("Start Server"));

