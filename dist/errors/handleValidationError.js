'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const handleValidationError = error => {
  const errors = Object.values(error.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const statusCode = 500;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};
exports.default = handleValidationError;
