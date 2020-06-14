const express = require('express');

// importing methods from controller
const { getCourses, getCourse, addCourse } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse);

module.exports = router;
