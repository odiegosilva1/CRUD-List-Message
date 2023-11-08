import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
return res.json('Server rodando');

});

// app.post('/user', function (req, res) {
//     res.post('Insira um carro')
// });
// app.put('/user/:id', function (req, res) {
//     res.send(`Editar um carro ${req.params.id}`);
//   });
   
//   app.delete('/user/:id', function (req, res) {
//     res.send(`Excluir um carro com o id ${req.params.id}`);
//   });

app.listen(8080, () => console.log("Servidor iniciado"));