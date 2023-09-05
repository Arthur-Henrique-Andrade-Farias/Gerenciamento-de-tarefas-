const express = require('express')
const cors = require('cors'); 
const UserController = require('./controllers/UserController')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static("../frontend/TaskManagementApp/dist"));

server.post('/register', UserController.newUser)
server.get('/login', UserController.login)

server.listen(8080)