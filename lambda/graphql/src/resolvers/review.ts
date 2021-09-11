import {
  createReview,
  getReviews,
  getReview,
  editReview,
  voteReview,
} from 'mongodb';
import { VoteAction } from 'cutopia-types/lib/codes';

import { verifyCourseId } from '../utils';
import {
  MutationResolvers,
  QueryResolvers,
  ReviewDetailsResolvers,
  ReviewResolvers,
} from '../schemas/types';

type ReviewResolver = {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  Review: ReviewResolvers;
  ReviewDetails: ReviewDetailsResolvers;
};

const reviewsResolver: ReviewResolver = {
  Mutation: {
    createReview: async (parent, { input }, { user }) => {
      verifyCourseId(input.courseId);
      const { username } = user;
      const { createdAt } = await createReview({
        ...input,
        username,
      });
      return {
        createdAt,
      };
    },
    voteReview: async (parent, { input }, { user }) => {
      const { username } = user;
      await voteReview({
        ...input,
        username,
      });
    },
    editReview: async (parent, { input }, { user }) => {
      verifyCourseId(input.courseId);
      const { username } = user;
      await editReview({
        ...input,
        username,
      });
    },
  },
  Review: {
    username: ({ username, anonymous }) => {
      return anonymous ? 'Anonymous' : username;
    },
    myVote: ({ upvoteUserIds, downvoteUserIds }, args, { user }) => {
      if (user) {
        const { username } = user;
        if (upvoteUserIds.includes(username)) {
          return VoteAction.UPVOTE;
        }
        if (downvoteUserIds.includes(username)) {
          return VoteAction.DOWNVOTE;
        }
      }
      return null;
    },
  },
  Query: {
    reviews: async (parent, { input }) => {
      /* TODO: Not sure check or not, cuz rare + add lambda billed time?
      if (input.courseId) {
        verifyCourseId(input.courseId);
      }
      */
      return await getReviews(input);
    },
    review: async (parent, { input }) => {
      verifyCourseId(input.courseId);
      return await getReview(input);
    },
  },
  ReviewDetails: {},
};

export default reviewsResolver;
