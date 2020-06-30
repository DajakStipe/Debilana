const express = require('express');

// importing methods from controller
const { getReviews } = require('../controllers/reviews');

const Course = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');
const Review = require('../models/Review');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }),
  getReviews
);

module.exports = router;
