const { Router } = require('express')
const UsersModel = require('./apps/models/Users')
const UserController = require('./apps/controllers/userController')
const routes = new Router()

routes.get('/', (req, res) => {
    return res.json({ message: 'Server is on' })
})

routes.get('/users', UserController.create)

module.exports = routes