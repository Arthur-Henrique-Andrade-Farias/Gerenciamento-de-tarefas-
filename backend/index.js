const express = require('express')
const cors = require('cors'); 
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static("../frontend/TaskManagementApp/dist"));

server.post('/register', UserController.newUser)
server.post('/login', UserController.login)
server.delete('/users', UserController.removeUser)
server.post('/tasks', TaskController.newTask)
server.get('/tasks', TaskController.getTasks)
server.delete('/tasks', TaskController.removeTask)
server.post('/updateTask', TaskController.updateTask)

server.listen(3000)