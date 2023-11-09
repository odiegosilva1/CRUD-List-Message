import express, { request, response } from 'express';
import express from 'express';
const app = express();
app.use(express.json());

let message = []
let idMessage = 1
let idUser = 1

//Root '/'
app.get('/', (req, res) => {
  return res.json('ok')
});

//Show messages
app.getMaxListeners('/messageList', (req, res) => {
  return res.json(messageList)
  })

  // Creat message list
  app.post('/messageList', (req, res) => {
    const body = request.body
    const message = {
      id: idMessage++,
      title: body.title,
      desc: body.desc
    }

    messageList.push(message)
    console.log(body);
    return res.json("Message registered successfully")
  })

  //Update messages list
  app.put('/listaRecados/:id', (req, res) => {
    const body = req.body
    const params = req.params

    const changeIndexList = messageList.findIndex((message) => {
      return message.id === Number(params.id)
    })

    if (changeIndexList === -1) {
      return response.json("Message not found")
    } else {
      for (let i = 0; i < messageList.length; i++) {
        if (messageList[i].id == Number(params.id)) {
            messageList[i].title = body.title
            messageList[i].desc = body.desc

            return res.json("Successfully changed")
        }
      }
    } 
  })

  //Del message

  app.delete('/messageList/:id', (res, req) => {
    const params = request.params

    const delIndexList = messageList.findIndex((message) => {
      console.log(message);
      return message.id === Number(params.id)

    })

    console.log(params.id + "param id");
    console.log(delIndexList);

    delete messageList[delIndexList]

    return res.json("Message deleted successfully")
  })

  //Find users
  app.post('/user', (req, res) => {
    const body = res.bady

    const user = {
      id: idUser++,
      name: body.name,
      email: body.email,
      pwd: body.pwd
    }
    user.push(user)
    console.log(body);
    return response.json("User successfully registered")
  })

  //update user
  app.put('/user/:id', (req, res) => {
    const params  = req.params
    const body = req.body

    const changeUserIndex = user.findIndex((user) => {
      return user.id === Number(params.id)
    })

    if (changeUserIndex === -1) {
      return res.json("User not find")
    }

    const user = {
      name: body.name,
      email: body.email,
      pwd: body.pwd

    }

    users[changeUserIndex] = user

    return response.json("User updated successfully")

  
  })

  //Del user
  app.delete('/user/:id', (req, res) => {
    const params = req.params

    const delUserIndex = user.findIndex((user) => {
      return user.id === Number(params.id)
    })

    delete users[delUserIndex]

    return res.json("User deleted successfully")
  })


app.listen(8080, () => console.log("Server Start"));
