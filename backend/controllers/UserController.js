const database = require('../database/connection')

class UserController {
    newUser(req, res) {
        const { name, username, email, password } = req.body

        database.insert({ name, username, email, password }).table("users").returning("userid").then(data => {
            res.json({ message: "User registered", userid: data[0].userid })
        }).catch(error => {
            console.log(error)
        })
    }
    login(req, res) {
        const { email, password } = req.body

        database.select("password").table("users").where({ email: email }).then(user => {
            if (user.length > 0) {
                user[0].password = user[0].password.trim()
                if (password == user[0].password) {
                    res.json({ message: "Accepted" })
                } else {
                    res.json({ message: "Wrong password" })
                }
            } else {
                res.json({ message: "User Not Found" })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    removeUser(req, res){
        const { name, username, email, password } = req.body
        database('users').where({email: email, username:username, name:name, password:password}).del()
        .then(user => {
            res.json({message: "User Removed"})
        }).catch(error => {
            console.log|(error)
        })
    }
}

module.exports = new UserController()