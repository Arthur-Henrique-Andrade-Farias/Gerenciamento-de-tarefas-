const request = require('supertest')
const server = 'http://localhost:3000'

describe('Tasks endpoints', () => {

    let userid = -1;
    let taskid = -1;
    let taskid2 = -1;

    it('should create a new test user', async () => {
        const res = await request(server)
            .post('/register')
            .send({ name: "Test Name TASKS", username: "testnametasks", email: 'tasks@email.com', password: "tasks123" })

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("User registered")

        userid = res.body.userid
    })


    it('should create a new task for the test user', async () => {

        const res = await request(server)
            .post('/tasks')
            .send({
                "userid": userid,
                "title": "test task",
                "description": "test desc",
                "completion_status": "false",
                "tags": ["test", "test1"]
            })


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Task registered")
        taskid = res.body.taskid
    })

    it('should update the task', async () => {
        const res = await request(server)
            .post('/updateTask')
            .send({
                "id": taskid,
                "title": "updated test task",
                "description": "updated test desc",
                "completion_status": true,
                "tags": ["updated test task tags"]
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Task Updated")
    })

    it('should create a second task for the test user', async () => {

        const res = await request(server)
            .post('/tasks')
            .send({
                "userid": userid,
                "title": "test task 2",
                "description": "test desc 2",
                "completion_status": "false",
                "tags": ["test 2", "test1 2"]
            })


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Task registered")
        taskid2 = res.body.taskid
    })


    it('should get all tasks from the test user', async () => {
        const res = await request(server)
            .get('/tasks').query({ userid: userid })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual([{
            "title": "updated test task",
            "description": "updated test desc",
            "completion_status": true,
            "tags": ["updated test task tags"]
        }, {
            "title": "test task 2",
            "description": "test desc 2",
            "completion_status": false,
            "tags": ["test 2", "test1 2"]
        }])
    })

    it('should delete the first test task from the test user', async () => {
        const res = await request(server)
            .delete('/tasks')
            .send({taskId: taskid})

            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Task Deleted")
    })

    it('should delete the second test task from the test user', async () => {
        const res = await request(server)
            .delete('/tasks')
            .send({taskId: taskid2})

            expect(res.statusCode).toEqual(200)
            expect(res.body.message).toEqual("Task Deleted")
    })


    it('should delete the test User', async () => {
        const res = await request(server)
            .delete('/users')
            .send({ name: "Test Name TASKS", username: "testnametasks", email: 'tasks@email.com', password: "tasks123" })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({ "message": "User Removed" })
    })
})