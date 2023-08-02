const { Router } = require('express')
const UsersModel = require('./apps/models/Users')
const UserController = require('./apps/controllers/userController')
const schemaValidator = require('./apps/middlewares/schemaValidator')
const creatUserSchema = require('./schemas/create.user.schema.json')
const AuthenticationController = require('./apps/controllers/authenticationController')
const authSchema = require('./schemas/auth.schema.json')
const AuthenticationMiddleware = require('./apps/middlewares/authentication')
const { upload } = require('./configs/multer')
const FileController = require('./apps/controllers/filecontroller')

const routes = new Router()

routes.post('/users', schemaValidator(creatUserSchema), UserController.create)
routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate)

routes.use(AuthenticationMiddleware)

routes.get('/', (req, res) => {
    return res.json({ message: 'Funcionou!' })
})

routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)
routes.get('/user-profile', UserController.userProfile)

routes.post('/upload', upload.single('image'), FileController.upload)

module.exports = routes