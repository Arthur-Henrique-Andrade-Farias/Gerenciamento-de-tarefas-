const database = require('../database/connection')

class TaskController {
    newTask(req, res) {

        const { userid, title, description, completion_status, tags } = req.body

        database.insert({ userid, title, description, completion_status, tags }).table("tasks").then(data => {
            res.json({ message: "Task registered" })
        }).catch(error => {
            console.log(error)
        })
    }
    getTasks(req, res) {
        const { userid } = req.query
        console.log(userid)

        database.select("title").select("description").select("completion_status").select("tags").table("tasks").where({ userid: userid }).then(tasks => {
            console.log(tasks)
            res.json(tasks)
        }).catch(error => {
            console.log(error)
        })
    }
    removeTask(req, res) {
        const { taskId } = req.body

        database('tasks').where({ id: taskId }).del().then(
            res.json({ message: "Task Deleted" })
        );
    }
    updateTask(req, res) {
        const { id, title, description, completion_status, tags } = req.body

        database('tasks').update({title: title, description: description, completion_status: completion_status, tags: tags}).where({id: id}).then(
            res.json({message: "Task Updated"})
        )
    }
}

module.exports = new TaskController()