import express, { request, response } from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
const app = express();

app.use(express.json());

let users = 1
const messageList = []
const user = [
  {
    id: users++,
    name: "Diego",
    email: "mail@me1",
    pwd: "$2a$06$.EcekE08nGe8cOTz7jp86ulRMCFO7vaesTT1eRVay.KPrhSwN0ouW"
  },
  {
    id: users++,
    name: "Ana",
    email: "mail@me2",
    pwd: "$2a$06$fEn.pmfaO9JIYQZlj6Yvfe6fOuhmCuFTWYAceAXIX0J/KnL5ZMFJi"
  },
  {
    id: users++,
    name: "Renato",
    email: "mail@me3",
    pwd: "$2a$06$PJj.36GgjYGs.wddloOt6ui/3Tn0bNEARKzJqPUMI9p0c/qIB45s6"
  }
]

let idMessage = 1

app.get('/messageList', (req, res) => {
  return res.json('ok')
});


app.get('/messageList', (req, res) => {
  return res.json(messageList)
})


app.post('/messageList', (req, res) => {
  const body = request.body
  const message = {
    id: idMessage++,
    title: body.title,
    desc: body.desc
  }
  if (body.title == undefined) {
    return response.status(400).json("Description not provided!")
  }

  messageList.push(message)
  console.log(body);
  return response.json("Message registered successfully")
})


app.put('/listaRecados/:id', (req, res) => {
  const body = req.body
  const params = req.params

  const changeIndexList = messageList.findIndex((message) => {
    return message.id === Number(params.id)
  })

  if (changeIndexList === -1) {
    return response.status(400)("Message not found")
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

app.delete('/messageList/:id', (res, req) => {
  const params = request.params

  const delIndexList = messageList.findIndex((message) => {
    console.log(message);
    return message.id === Number(params.id)

  })
  if (delIndexList == -1) {
    return res.status(400).json("Message not found")
  }

  console.log(delIndexList);
  delete messageList[delIndexList]

  return res.json("Message deleted successfully")
})

app.get('/user:name?', (req, res) => {
  const queryParams = request.query
  if (queryParams.name != undefined) {
    const userNames = users.filter((user) => {
      return user.name == queryParams.name
    })
    return response.json(userNames)
  } else {
    return response.json(users);
  }
})

app.post('/user', async (req, res) => {
  const body = req.body

  if (body.name == undefined) {
    return res.status(400).json("Name undefined")
  }

  if (body.email == undefined) {
    return res.status(400).joson("Password not defined")
  }

  if (body.pwd == undefined) {
    return res.status(400).json("Password not defined")
  }

  const existingEmail = users.find(users => {
    return users.email === body.email

  })

  if (existingEmail != undefined) {
    return res.json("E-mail already registered")
  }

  const hashedPwd = await bcrypt.hash(body.pwd, 6)

  const user = {
    id: createUser++,
    name: body.name,
    email: body.email,
    pwd: hashedPwd
  }
  user.push(user)
  console.log(body);
  return response.json("User successfully registered")
})

//post
app.post('/user/login', async (req, res) => {
  const body = req.body

  if (body.email == undefined) {
    return res.status(400).json("E-mail is not defined")
  }

  if (body.pwd == undefined) {
    return res.status(400).json("Password is not defined")
  }

  const existingEmail = users.find(user => {
    return user.email === body.email
  })

  if (existingEmail === undefined) {
    return res.status(401).json("Invalid credentials")
  }

  const hashedPwd = await bcrypt.compare(body.pwd, existingEmail.pwd)
  if (hashedPwd === false) {
    return res.status(401).json("Invalid credentials")
  }

  const accessToken = jwt.sign({ username: existingEmail.name },
    "growdev", { expiresIn: "1900s", }
  );
  return res.status(201).json({
    accessToken,
  });
})

//update user
app.put('/user/:id', (req, res) => {
  const params = req.params
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

  user[changeUserIndex] = user

  return response.json("User updated successfully")


})

//Del user
app.delete('/user/:id', (req, res) => {
  const params = req.params

  const delUserIndex = user.findIndex((user) => {
    return user.id === Number(params.id)
  })

  if (delUserIndex === -1) {
    return res.status(400).json("ID inválido")
  }

  delete users[delUserIndex]
  return res.json("User deleted successfully")
})


app.listen(8080, () => console.log("Server Start"));