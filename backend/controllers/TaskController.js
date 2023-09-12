const database = require('../database/connection')

class TaskController {
    newTask(req, res) {

        const { userid, title, description, completion_status, tags } = req.body

        database.insert({ userid, title, description, completion_status, tags }).table("tasks").returning("id").then(data => {
            res.json({ message: "Task registered", taskid: data[0].id})
        }).catch(error => {
            console.log(error)
        })
    }
    getTasks(req, res) {
        const { userid } = req.query

        database.select("title").select("description").select("completion_status").select("tags").table("tasks").where({ userid: userid }).then(tasks => {
            res.json(tasks)
        }).catch(error => {
            console.log(error)
        })
    }
    removeTask(req, res) {
        const { taskId } = req.body

        database('tasks').where({ id: taskId }).del().then(
            res.json({ message: "Task Deleted" })
        ).catch(error => {
            console.log(error)
        })
    }
    updateTask(req, res) {
        const { id, title, description, completion_status, tags } = req.body

        database('tasks').update({title: title, description: description, completion_status: completion_status, tags: tags}).where({id: id}).then(
            res.json({message: "Task Updated"})
        ).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new TaskController()