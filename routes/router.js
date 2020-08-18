const { Router } = require('express')
const router = Router()
const controller = require('./controller')
// GET
router.get('/:name/:id', controller.getNotes)
router.get('/files/:name/:id', controller.getFiles)
// POST
router.post('/create', controller.createTodo)
router.post('/complete', controller.completeTodo)
router.post('/auth', controller.authUser)
router.post('/signin', controller.signinUser)
router.post('/signout', controller.signoutUser) 
router.post('/upload', controller.uploadFile)
router.post('/deletefile', controller.deleteFile)
//DELETE
router.delete('/delete', controller.deleteTodo)
module.exports = router