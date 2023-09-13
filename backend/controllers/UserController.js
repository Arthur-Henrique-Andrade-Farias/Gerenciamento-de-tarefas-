const database = require('../database/connection')

class UserController {
    newUser(req, res) {
        const { name, username, email, password } = req.body

        

        database.insert({ name, username, email, password }).table("users").returning("userid").then(data => {
            res.status(201).json({ message: "User registered", userid: data[0].userid })
        }).catch(error => {
            if(error.code == '23505'){
                res.status(409).json({message: "Email already registered"})
            }
        })
    }
    login(req, res) {
        if(req.session.authenticated){
            res.status(200).json({ message: "Login Accepted"})
        }else{
            const { email, password } = req.body
            database.select("password").select("userid").table("users").where({ email: email }).then(user => {
                if (user.length > 0) {
                    user[0].password = user[0].password.trim()
                    if (password == user[0].password) {
                        req.session.authenticated = true
                        req.session.userid = user[0].userid
                        res.status(200).json({ message: "Login Accepted"})
                    } else {
                        res.status(401).json({ message: "Wrong password" })
                    }
                } else {
                    res.status(404).json({ message: "User Not Found" })
                }
            }).catch(error => {
                console.log(error)
            })
        }


    }
    removeUser(req, res){
        const { name, username, email, password } = req.body

        database('users').where({email: email, username:username, name:name, password:password}).returning('userid').then(userid => {
            userid = userid[0].userid
            database('tasks').where({userid: userid}).del().catch(error => {
                console.log(error)
            })

            database('users').where({userid: userid}).del().then(
                res.sendStatus(200).json({message: "User Removed"})
            ).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })

    }
}

module.exports = new UserController()