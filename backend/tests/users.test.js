const request = require('supertest')
const server = 'http://localhost:3000'

describe('Users endpoints', () => {
    it('should create a new User', async () => {
        const res = await request(server)
        .post('/register')
        .send({ name: "Test Name USERS", username: "testname", email: 'test@email.com', password: "test123"})

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("User registered")
    })
    it('should be able to login with the new User', async () => {
        const res = await request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: "test123"})

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({"message": "Accepted"})
    })
    it('should delete the new User', async () =>{
        const res = await request(server)
        .delete('/users')
        .send({ name: "Test Name USERS", username: "testname", email: 'test@email.com', password: "test123"})

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({"message": "User Removed"})
    })
})
