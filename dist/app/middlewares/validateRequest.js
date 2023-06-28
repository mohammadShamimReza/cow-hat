'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const validateRequest = scheme => async (req, res, next) => {
  try {
    await scheme.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      cookier: req.cookies,
    });
    return next();
  } catch (error) {
    next(error);
  }
};
exports.default = validateRequest;
