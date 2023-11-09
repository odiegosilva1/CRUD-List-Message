import express, { request, response } from 'express';
import express from 'express';
const app = express();
app.use(express.json());

let message = []
let i = 1

//Show message
app.get('/message', (req, res) => {
  return res.json(message)
});

//Create a new message
app.post('/newMessage', (req, res) => {
  const infoRequest = req.body

  const newMessage = {
    id: i++,
    title: infoRequest.title,
    desc: infoRequest.desc,
    
  }
   //Update a message
  app.push('/message', (req, res)  => {
    const infoRequest = req.body
  }); 

  message.push()
  return res.status(201).json(message)
});


app.listen(8080, () => console.log("Servidor iniciado"));