import express, { request, response } from 'express';
const app = express();
app.use(express.json());

let carros =[]
let i = 1


app.get('/', (req, res) => {
return res.json('Server rodando');

});

app.post('/user', function (req, res) {
    res.post('Insira um user')
});
 app.post('/carros', (req, res)=> {
    const infoRequest = request.body

    const novoCarro = {
        id: i++,
        modelo: infoRequest.modelo,
        marca: infoRequest.marca,
        ano: infoRequest.ano,
        cor:infoRequest.cor,
        preco:infoRequest.preco
    }
    carros.push(novoCarro) {
        return.res.status(201).json(carros)
    }
    carros.push(novoCarro);
    return response.json('Ok Turma')
 });

app.listen(8080, () => console.log("Servidor iniciado"));