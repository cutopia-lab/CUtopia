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
  shareTimetable,
  getSharedTimetable,
} = require('./databases/timetable-db');

const {
  report,
  reportFeedback,
  REPORT_CATEGORIES,
  REVIEW_REPORT_TYPES,
  COURSE_REPORT_TYPES,
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
  shareTimetable,
  getSharedTimetable,
  report,
  reportFeedback,
  REPORT_CATEGORIES,
  REVIEW_REPORT_TYPES,
  COURSE_REPORT_TYPES,
  VOTE_ACTIONS,
  LOGIN_CODES,
  VERIFICATION_CODES,
  GET_PASSWORD_CODE_CODES,
  RESET_PASSWORD_CODES,
};
