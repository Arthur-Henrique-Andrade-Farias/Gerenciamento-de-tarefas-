const database = require('../database/connection')

class UserController{
    newUser(req, res){
        const {name, username, email, password} = req.body

        database.insert({name, username, email, password}).table("users").then(data => {
            res.json({message: "User registered"})
        }).catch(error => {
            console.log(error)
        })
    }
    login(req, res){
        const {email, password} = req.query
        console.log(email, password)

        database.select("password").table("users").where({email: email}).then(user => {
            if(user.length > 0){
                user[0].password = user[0].password.trim()
                if(password == user[0].password){
                    res.json({message: "Accepted"})
                }else{
                    res.json({message: "Wrong password"})
                }
            }else{
                res.json({message: "User Not Found"})
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new UserController()