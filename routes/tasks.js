const express = require('express');
const router = express.Router();
const {createTask,deleteTask,getAllTasks,updateTask} = require('../controllers/tasks')

router.route('/').post(getAllTasks);
router.route('/create').post(createTask);
router.route('/delete').post(deleteTask);
router.route('/update').put(updateTask);


module.exports = router;        