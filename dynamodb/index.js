const {
  createReview,
  editReview,
  getReviews,
  getReview,
  voteReview,
  VOTE_ACTIONS,
} = require('./databases/reviews-db');

const {
  createUser,
  verifyUser,
  updateUser,
  getUser,
  getResetPasswordCodeAndEmail,
  resetPassword,
  login,
  LOGIN_CODES,
  VERIFICATION_CODES,
  GET_PASSWORD_CODE_CODES,
  RESET_PASSWORD_CODES,
} = require('./databases/user-db');

const {
  getTimetable,
  addTimetable,
  removeTimetable,
} = require('./databases/timetable-db');

const {
  reportError,
  reportFeedback,
} = require('./databases/report-db');

module.exports = {
  createReview,
  editReview,
  getReviews,
  getReview,
  voteReview,
  createUser,
  verifyUser,
  updateUser,
  getUser,
  getResetPasswordCodeAndEmail,
  resetPassword,
  login,
  getTimetable,
  addTimetable,
  removeTimetable,
  reportError,
  reportFeedback,
  VOTE_ACTIONS,
  LOGIN_CODES,
  VERIFICATION_CODES,
  GET_PASSWORD_CODE_CODES,
  RESET_PASSWORD_CODES,
};
