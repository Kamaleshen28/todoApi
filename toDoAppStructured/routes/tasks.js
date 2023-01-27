const express = require('express')
const router = express.Router()
const { 
    getTask,
    getTaskById,
    postTask,
    putTask,
    patchTask,
    deleteTaskById,
    deleteAll} = require('../controllers/tasks')


router.route('/')
    .get(getTask)
    .post(postTask)
    .delete(deleteAll);

router.route('/:id')
    .get(getTaskById)
    .put(putTask)
    .patch(patchTask)
    .delete(deleteTaskById)

module.exports = router;