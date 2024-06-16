const express = require('express');
const router = express.Router();
const {createLongTask,updateLongTask,deleteLongTask,getAllLongTasks} = require('../controllers/longTasks')

router.route('/').post(getAllLongTasks);
router.route('/create').post(createLongTask);
router.route('/delete').post(deleteLongTask);
router.route('/update').patch(updateLongTask);


module.exports = router;        