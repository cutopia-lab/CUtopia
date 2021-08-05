const {
  createReview,
  editReview,
  getReviews,
  getReview,
  voteReview
} = require('./databases/reviews-db');

const {
  createUser,
  verifyUser,
  updateUser,
  getUser,
  getResetPasswordCodeAndEmail,
  resetPassword,
  login
} = require('./databases/user-db');

const {
  addLecturerToCourse,
  getCourseLecturers
} = require('./databases/course-db');

const {
  getTimetable,
  addTimetable,
  removeTimetable,
  shareTimetable,
  getSharedTimetable
} = require('./databases/timetable-db');

const {
  report,
  reportFeedback
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
  addLecturerToCourse,
  getCourseLecturers,
  getTimetable,
  addTimetable,
  removeTimetable,
  shareTimetable,
  getSharedTimetable,
  report,
  reportFeedback
};
