// https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware
//This is combination of currying and closures
//currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.
//The curried effect is achieved by binding some of the arguments to the first function invoke, so that those values are fixed for the next invocation.
//see: https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript/32784025

// const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req,res,next)).catch(next);
const asyncHandler = function (fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
