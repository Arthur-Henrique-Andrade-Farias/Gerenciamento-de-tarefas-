const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'TaskManagementApp',
        password: 'luiz2004',
        port: 5432
    }
})

module.exports = knex

