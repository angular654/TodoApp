const { Router } = require('express')
const router = Router()
const controller = require('./controller')
// GET
router.get('/:name/:id', controller.getNotes)
router.get('/files/:name/:id', controller.getFiles)
// POST
router.post('/create/:id', controller.createTodo)
router.post('/complete', controller.completeTodo)
router.post('/auth', controller.authUser)
router.post('/signin', controller.signinUser)
router.post('/signout', controller.signoutUser) 
router.post('/upload/:id', controller.uploadFile)
router.post('/deletefile/:id', controller.deleteFile)
//DELETE
router.delete('/delete/:id', controller.deleteTodo)
module.exports = router