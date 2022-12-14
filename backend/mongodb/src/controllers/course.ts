import { Review } from 'cutopia-types';

import Course from '../models/course';

export const getCourse = async courseId => Course.findById(courseId);

export const updateCourseData = async (
  courseId: string,
  review: Review,
  oldReview?: Review // update course data from existing review if any
) => {
  const ratingInc = {
    'rating.numReviews': 1,
    'rating.overall': review.overall,
    'rating.grading': review.grading.grade,
    'rating.content': review.content.grade,
    'rating.difficulty': review.difficulty.grade,
    'rating.teaching': review.teaching.grade,
  };
  if (oldReview) {
    const critierions = ['grading', 'content', 'difficulty', 'teaching'];
    critierions.forEach(
      critierion =>
        (ratingInc[`rating.${critierion}`] -= oldReview[critierion].grade)
    );
    ratingInc['rating.numReviews'] = 0;
    ratingInc['rating.overall'] -= oldReview.overall;
  }

  return await Course.findByIdAndUpdate(
    courseId,
    {
      $addToSet: {
        lecturers: review.lecturer,
        terms: review.term,
      },
      $inc: ratingInc,
    },
    {
      new: true,
      upsert: true,
    }
  );
};
