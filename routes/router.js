const { Router } = require('express')
const router = Router({mergeParams: true});
const controller = require('./controller')
// GET
router.get('/notes', controller.getNotes)
router.get('/files', controller.getFiles)
// POST
router.post('/create', controller.createTodo)
router.post('/upload', controller.uploadFile)
// DELETE
router.delete('/delete', controller.deleteTodo)
router.delete('/deletefile', controller.deleteFile)
module.exports = router