const database = require('../database/connection')

class UserController{
    newUser(req, res){
        const {name, username, email, password} = req.body

        console.log(name, username, email, password)

        database.insert({name, username, email, password}).table("users").then(data => {
            res.json({message: "Usuário criado com sucesso!"})
        }).catch(error => {
            console.log(error)
        })
    }
    getUser(req, res){
        const {email, password} = req.body
        console.log(email, password)

        database.select("*").table("users").where({email:email}).then(user=>{
            res.json({user})
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new UserController()