const LAZY_LOAD_BUFFER = 50;
const SNACKBAR_TIMEOUT = 3000;
const COURSE_CARD_MAX_HEIGHT = 580;
const TARGET_REVIEW_WORD_COUNT = 80;
const HISTORY_MAX_LENGTH = 3;
const MAX_SEARCH_RESULT_LENGTH = 20;
const SENTRY_SAMPLING_RATE = 0.4;

const TIMETABLE_CONSTANTS = Object.freeze({
  START_HOUR: 8,
  END_HOUR: 19,
  NO_OF_HOURS: 12,
  NO_OF_DAYS: 6,
  LEFT_BAR_WIDTH: 52,
  CELL_WIDTH: 52,
  CELL_HEIGHT: 52,
});

export {
  LAZY_LOAD_BUFFER,
  SNACKBAR_TIMEOUT,
  COURSE_CARD_MAX_HEIGHT,
  TARGET_REVIEW_WORD_COUNT,
  HISTORY_MAX_LENGTH,
  MAX_SEARCH_RESULT_LENGTH,
  SENTRY_SAMPLING_RATE,
  TIMETABLE_CONSTANTS,
};
