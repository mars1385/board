// to replace try catch block
const asyncHandler = (myFn) => (req, res, next) => Promise.resolve(myFn(req, res, next)).catch(next);

// const asyncHandler = (myFn) => async (req, res, next) => {
//   try {
//     await myFn(req, res, next);
//   } catch (err) {
//     next;
//   }
// };

module.exports = asyncHandler;
