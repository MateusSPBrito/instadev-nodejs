const { Router } = require('express')
const UsersModel = require('./apps/models/Users')
const UserController = require('./apps/controllers/userController')
const schemaValidator = require('./apps/middlewares/schemaValidator')
const creatUserSchema = require('./schemas/create.user.schema.json')
const AuthenticationController = require('./apps/controllers/authenticationController')
const authSchema = require('./schemas/auth.schema.json')
const AuthenticationMiddleware = require('./apps/middlewares/authentication')

const routes = new Router()

routes.post('/users', schemaValidator(creatUserSchema), UserController.create)
routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate)

routes.use(AuthenticationMiddleware)

routes.get('/', (req, res) => {
    return res.json({ message: 'Funcionou!' })
})

routes.put('/users', UserController.update)

module.exports = routes