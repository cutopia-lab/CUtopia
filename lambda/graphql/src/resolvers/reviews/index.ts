import {
  getReviews,
  getReview,
  createReview,
  editReview,
  voteReview,
} from 'dynamodb';
import { recalWithNewReview, recalWithEdittedReview } from '../ranking/impl';
import { VoteAction } from 'cutopia-types/lib/codes';

const reviewsResolver = {
  Mutation: {
    createReview: async (parent, { input }, { user }) => {
      const { id, createdDate } = await createReview(input, user);
      const { courseRatings, groupRatings } = await recalWithNewReview(input);
      return {
        id,
        createdDate,
        courseRatings,
        groupRatings,
      };
    },
    voteReview: async (parent, { input }, { user }) => {
      return await voteReview(input, user);
    },
    editReview: async (parent, { input }, { validateOwner }) => {
      const { courseId, createdDate } = input;
      const oldReviewData = await getReview({ courseId, createdDate });
      validateOwner(oldReviewData.username);

      const modifiedDate = await editReview({
        oldReviewData,
        newReviewData: input,
      });
      const { courseRatings, groupRatings } = await recalWithEdittedReview({
        oldReviewData,
        ...input,
      });
      return {
        modifiedDate,
        courseRatings,
        groupRatings,
      };
    },
  },
  Review: {
    username: ({ username, anonymous }) => {
      return anonymous ? 'Anonymous' : username;
    },
    myVote: ({ upvotesUserIds, downvotesUserIds }, args, { user }) => {
      if (user) {
        const { username } = user;
        // upvotesUserIds and downvotesUserIds are sets
        if (upvotesUserIds.values.includes(username)) {
          return VoteAction.UPVOTE;
        }
        if (downvotesUserIds.values.includes(username)) {
          return VoteAction.DOWNVOTE;
        }
      }
      return null;
    },
  },
  Query: {
    reviews: async (parent, { input }) => {
      return await getReviews(input);
    },
    review: async (parent, { input }) => {
      return await getReview(input);
    },
  },
  ReviewDetails: {},
};

export default reviewsResolver;
