const createError = require('http-errors');

exports.asyncErrorHandler = (fn) => (req, res, next) =>
  fn(req, res, next).catch((err) => next(createError(500, err.message)));
  // promise ? 



