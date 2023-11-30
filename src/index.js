// Importando os pacotes usando 'require'
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors()); // Adicionando o middleware CORS

// Exemplo de correção no trecho com erro no nome do campo da requisição:
app.put('/final-project/edit-message', async (request, response) => {
    const infoRequest = request.body; // Corrigindo para request.body

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

app.listen(8080, () => console.log("Start Server"));
