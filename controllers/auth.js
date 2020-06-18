const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Register User
// @route     GET /api/v1/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //  create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // CREATE TOKEN
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      LOGIN User
// @route     post /api/v1/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // CREATE TOKEN
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
