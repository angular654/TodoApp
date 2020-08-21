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
// DELETE
router.delete('/delete/:id', controller.deleteTodo)
router.delete('/deletefile/:id', controller.deleteFile)
module.exports = router