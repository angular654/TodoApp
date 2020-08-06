const { Router } = require('express')
const router = Router()
const controller = require('./controller')
// GET
router.get('/', controller.home)
router.get('/note', controller.note)
router.get('/files', controller.getFiles)
// POST
router.post('/create', controller.createTodo)
router.post('/complete', controller.completeTodo)
router.post('/auth', controller.authUser)
router.post('/signin', controller.signinUser)
router.post('/signout', controller.signoutUser) 
router.post('/upload', controller.uploadFile)
router.post('/delete', controller.deleteTodo)
router.post('/deletefile', controller.deleteFile)
module.exports = router