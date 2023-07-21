const {Router} = require('express')

const routes = new Router()

routes.get('/', (req, res)=>{
    return res.json({message: 'Server is on'})
})

module.exports = routes