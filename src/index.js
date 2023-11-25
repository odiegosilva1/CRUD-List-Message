
import { randomUUID } from 'crypto';
import express, { response } from 'express';
import bcrypt from "bcrypt";
import { request } from 'http';

const app = express();

app.use(express.json());

const usuarios = [
    {
        id: randomUUID(),
        nome: "Renato",
        email: "renato@mail.com",
        senha: "$2a$06$oWaGUzjgm8wGpV8otyteyuuiLM3blA6ul2q.X3X6df33zLStZBwXK",
        recados: [
            {
                id: randomUUID(),
                titulo: "Dentista",
                descricao: "3:00"
            }
        ]
    },
    {
        id: randomUUID(),
        nome: "Carlos",
        email: "carlos@mail.com",
        senha: "$2a$06$6aRs1GjmDyjTFUPzJWqx7OohIj74m4KNOhMoCE9LjLp6e/.BZgJOe",
        recados: [
            {
                id: randomUUID(),
                titulo: "Comprar carro",
                descricao: "Não consigo"
            }
        ]
    },
    {
        id: randomUUID(),
        nome: "Diego Silva",
        email: "silva@mail.com",
        senha: "$2a$06$fyo17xUNtk0eHJt4ehjdku6a7DQpn.HChRhQfneBHMdH9XbvW75ha",
        recados: [
            {
                id: randomUUID(),
                titulo: "Trabalho",
                descricao: "Entregar"
            }
        ]
    }
]

app.get('/', (request, response) => {
    return response.json('OK')
});

app.get('/usuario', (request, response) => {
    return response.json(usuarios)
})

app.get('/usuario/:id/recados/', (request, response) => {
    const params = request.params.id


    const pegaUsuariosPeloIndice = usuarios.findIndex((usuario) => {
        return usuario.id == params
    })

    if (pegaUsuariosPeloIndice === -1) {
        return response.status(400).json("Usuario não encontrado")
    }

    return response.json(usuarios[pegaUsuariosPeloIndice]);

})



app.post('/usuario/login', async (request, response) => {
    const body = request.body;

    if (body.email == undefined) {
        return response.status(400).json("E-mail não informado!");
    }

    if (body.senha == undefined) {
        return response.status(400).json("Senha não informada!");
    }

    const existeEmail = usuarios.find(usuario => {
        return usuario.email === body.email;
    });

    if (existeEmail === undefined) {
        return response.status(401).json("Credenciais inválidas!");
    }

    const hashedSenha = await bcrypt.compare(body.senha, existeEmail.senha);

    if (hashedSenha === false) {
        return response.status(401).json("Credenciais inválidas!");
    }

    return response.status(201).json({
        message: "Autenticação bem-sucedida!",
    });
});

app.put('/usario/recados/:idRecado', (request, response) => {
    const body = request.body
    const idAutenticado = request.user.usuarioId
    const idRecado = request.params.params.idRecado

    const pegaIndiceUsuario = usuarios.findIndex(usuario => {
        return usuario.id == idAutenticado
    })
    if (pegaIndiceUsuario === -1) {
        return response.status(401).json("Usuário não Autenticado")
    }

    const pegaIndiceRecado = usuarios[pegaIndiceUsuario].recados.findIndex(recado => {
        return recado.id === idRecados
    })

    if (pegaIndiceRecado === -1) {
        return response.status(400).json("Recado inválido")
    }

    const recado = {
        id: idRecados,
        titulo: body.titulo,
        descricao: body.descricao
    }

    usuarios[pegaIndiceUsuario].recados[pegaIndiceRecado] = recado

    return response.status(201).json("Recado atualizado com sucesso!!")
})


//Deleta Recado


app.listen(8080, () => console.log("Servidor iniciado"));
