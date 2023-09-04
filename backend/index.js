const express = require('express')
const UserController = require('./controllers/UserController')

const server = express()

server.use(express.json())

server.post('/register', UserController.newUser)
server.get('/login', UserController.login)

server.listen(3000)