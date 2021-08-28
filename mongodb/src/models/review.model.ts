import { Schema, model } from 'mongoose';
import { ratingSchema, requiredNumber, requiredString } from '../schemas';

type ReviewDetailSchema = {
  grade: number;
  text: string;
};

type Review = {
  id: string;
  username: string;
  reviewId: string;
  title: string;
  courseId: string;
  term: string;
  lecturer: string;
  anonymous: boolean;
  upvotes: number;
  downvotes: number;
  upvoteUserIds: string[];
  downvoteUserIds: string[];
  overall: number;
  grading: ReviewDetailSchema;
  teaching: ReviewDetailSchema;
  difficulty: ReviewDetailSchema;
  content: ReviewDetailSchema;
  createdAt: number;
  updatedAt: number;
};

const reviewDetailSchema = new Schema<ReviewDetailSchema>(
  {
    grade: ratingSchema,
    text: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

// temporarily remove type due to: https://github.com/Automattic/mongoose/issues/10623
const reviewSchema = new Schema(
  {
    _id: requiredString,
    username: requiredString,
    courseId: requiredString,
    title: String,
    term: requiredString,
    lecturer: requiredString,
    anonymous: { type: Boolean, required: true },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    upvoteUserIds: [String],
    downvoteUserIds: [String],
    overall: ratingSchema,
    grading: reviewDetailSchema,
    teaching: reviewDetailSchema,
    difficulty: reviewDetailSchema,
    content: reviewDetailSchema,
    updatedAt: requiredNumber,
  },
  {
    timestamps: {
      currentTime: Date.now,
      createdAt: false,
      updatedAt: true,
    },
    _id: false,
  }
);
reviewSchema.index({ courseId: 1, createdAt: -1 }, { unique: true });
reviewSchema.virtual('id').get(function () {
  return this._id;
});
reviewSchema.virtual('createdAt').get(function () {
  return this._id.split('#')[1];
});

const ReviewModal = model<Review>('Review', reviewSchema);

export default ReviewModal;
