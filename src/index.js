import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
return response.json('Server rodando');

});

app.listen(8080, () => console.log("Servidor iniciado"));