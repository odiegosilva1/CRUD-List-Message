const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');  // Adicionando a importação de randomUUID

const app = express();
app.use(express.json());
app.use(cors()); // Adicionando o middleware CORS

// Lista de usuários e contadores
let usersList = [];
let counter = 0;
let messageCounter = 0;

// Função middleware para verificar token JWT
const verifyJwt = function (req, res, next) {
    const body = req.body;

    jwt.verify(body.accessToken, "growdev", (err, idUsuario) => {
        if (err) {
            return res.status(403).json("Access token invalido");
        }
        req.user = idUsuario;

        next();
    });
};

// Rota para adicionar mensagem (editada conforme seu modelo de código)
app.post('/final-project/edit-message', async (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.id_user === undefined || infoRequest.id_user === "") {
        return response.status(400).json("Enter a correct id");
    }

    if (infoRequest.id_recado === undefined || infoRequest.id_recado === "") {
        return response.status(400).json("Enter a correct id");
    }

    if (infoRequest.titulo === undefined || infoRequest.titulo === "") {
        return response.status(400).json("Please enter a valid title");
    }

    if (infoRequest.descricao === undefined || infoRequest.descricao === "") {
        return response.status(400).json("Please provide a valid description");
    }

    const modifiedMessage = {
        id: infoRequest.id_recado,
        title: infoRequest.titulo,
        description: infoRequest.descricao,
    };

    // Corrigindo a busca do usuário na lista
    let user = usersList.find(user => user.id === infoRequest.id_user);
    if (!user) {
        return response.status(400).json("Could not complete your request");
    }

    // Corrigindo o nome da lista de usuários
    let index = usersList.findIndex(user => user.id === infoRequest.id_user);
    if (index === -1) {
        return response.status(400).json("Could not complete your request");
    }

    user.recados[index] = modifiedMessage; // Corrigindo a atualização da mensagem
    return response.status(201).json("Message edited successfully");
});

// Rota para obter a lista de usuários
app.get('/final-project/list-users', (request, response) => {
    return response.json(usersList);
});

// Rota para visualizar um usuário específico
app.get('/final-project/view-user', (request, response) => {
    const parameters = request.query;

    let user = usersList.find(user => user.id == parameters.id);
    if (!user) {
        return response.status(400).json("User not found");
    }

    return response.json(user);
});

// Rota para editar informações do usuário
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
    };

    let index = usersList.findIndex(user => user.id == infoRequest.id);
    if (index === -1) {
        return response.status(400).json("User not found");
    }

    usersList[index] = editedUser;
    return response.status(201).json("User edited successfully");
});

// Rota para deletar um usuário
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

// Rota para deletar uma mensagem de um usuário
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

// Rota de teste para verificar se o servidor está em execução
app.get('/final-project/messages', (request, response) => {
    return response.json('Server is running');
});

// Rota para adicionar uma mensagem a um usuário
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
    };

    user.messages.push(newMessage);
    return response.status(201).json('The message "' + newMessage.description + '" was added successfully');
});

// Rota para obter a lista de mensagens de um usuário
app.get('/final-project/list-messages/:id?', (request, response) => {
    const parameters = request.query;

    let user = usersList.find(item => item.id == parameters.id);
    if (user !== undefined) {
        return response.status(201).json(user.messages);
    } else {
        return response.status(201).json(parameters.id);
    }
});

// Rota para visualizar uma mensagem de um usuário
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

// Rota para editar uma mensagem de um usuário
app.put('/final-project/edit-message', async (request, response) => {
    const infoRequest = request.body;

    if (infoRequest.id_user === undefined || infoRequest.id_user === "") {
        return response.status(400).json("Enter a correct id");
    }

    if (infoRequest.id_recado === undefined || infoRequest.id_recado === "") {
        return response.status(400).json("Enter a correct id");
    }

    if (infoRequest.titulo === undefined || infoRequest.titulo === "") {
        return response.status(400).json("Please enter a valid title");
    }

    if (infoRequest.descricao === undefined || infoRequest.descricao === "") {
        return response.status(400).json("Please provide a valid description");
    }

    const modifiedMessage = {
        id: infoRequest.id_recado,
        title: infoRequest.titulo,
        description: infoRequest.descricao,
    };

    let user = usersList.find(user => user.id == infoRequest.id_user);
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

// Inicialização do servidor
app.listen(8080, () => console.log("Start Server"));
