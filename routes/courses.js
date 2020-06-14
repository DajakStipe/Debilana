const express = require('express');

// importing methods from controller
const { getCourses } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);

module.exports = router;
