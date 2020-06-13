const errorHandler = (err, req, res, next) => {
  // log to console for dev
  // stack for file info
  console.log(err.stack.red);
  res
    .status(err.statusCode || 500)
    .json({ sucess: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
