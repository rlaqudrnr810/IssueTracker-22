function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'internal server error',
  });
}

module.exports = errorHandler;
