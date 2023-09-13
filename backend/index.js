const express = require('express')
const cors = require('cors'); 
const session = require('express-session')
const store = new session.MemoryStore() 
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(express.static("../frontend/TaskManagementApp/dist"))

server.use(session({
    secret: "uausecretotop",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
    saveUninitialized: false,
    store
}))
server.use(cors({
    origin: [
        'http://localhost:5173',
        'https://localhost:5173'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

server.get('/home', (req, res) => {
    res.redirect('/')
})
server.get('/register', (req, res) => {
    res.redirect('/')
})
server.get('/login', (req, res) => {
    res.redirect('/')
})
server.post('/register', UserController.newUser)
server.post('/login', UserController.login)
server.delete('/users', UserController.removeUser)
server.post('/tasks', TaskController.newTask)
server.get('/tasks', TaskController.getTasks)
server.post('/deleteTask', TaskController.removeTask)
server.post('/updateTask', TaskController.updateTask)

server.get('/checkSession', (req, res) => {
    if(req.session.authenticated){
        res.sendStatus(204)
    }else{
        res.sendStatus(401)
    }
})

server.get('/logout', (req, res) => {
    req.session.authenticated = null
    req.session.userid = null
    res.status(200).json({message: "Logged out"})
})

server.listen(3000)