const express = require('express');

// importing methods from controller
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

// Include other resource Routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
// if it containts bootcampid/courses re-route it to object
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

// we dont have to put '/api/v1/bootcamps' each time
