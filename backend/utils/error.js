
exports.createError = function createError(status, message, extra) {
  message = message || 'Something bad happened.';
  let err = {};
  err.message = message;
  err.success = false;
  err.time = Date.now();
  err.status = status || 500;
  err.extra = extra || {};
  return { error: err };
};
