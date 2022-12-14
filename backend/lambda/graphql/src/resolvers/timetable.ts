import {
  uploadTimetable,
  removeTimetable,
  getTimetable,
  getTimetablesOverview,
  switchTimetable,
  cloneTimetable,
} from 'mongodb';

import { Resolvers } from '../schemas/types';

const timetableResolver: Resolvers = {
  User: {
    timetables: async (parent, args, { user }) => {
      const { username } = user;
      return await getTimetablesOverview({ username });
    },
  },
  Query: {
    timetable: async (parent, { _id }, { user }) => {
      const { username } = user;
      return await getTimetable({ _id, username });
    },
  },
  Mutation: {
    uploadTimetable: async (parent, { input }, { user }) => {
      const { username } = user;
      return await uploadTimetable({ ...input, username });
    },
    removeTimetable: async (parent, { input }, { user }) => {
      const { username } = user;
      return await removeTimetable({ ...input, username });
    },
    switchTimetable: async (parent, { input }, { user }) => {
      const { username } = user;
      return await switchTimetable({ ...input, username });
    },
    cloneTimetable: async (parent, { input }, { user }) => {
      const { username } = user;
      return await cloneTimetable({ ...input, username });
    },
  },
};

export default timetableResolver;
