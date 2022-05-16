const { AuthenticationError, ForbiddenError } = require("apollo-server");
const authErrMessage = "*** you must be logged in ***";

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    example: () => "Hello World!",
  },
  Host: {
    __resolveReference: (user, { dataSources }) => {
      return dataSources.accountsAPI.getUser(user.id);
    },
  },
  Guest: {
    __resolveReference: (user, { dataSources }) => {
      return dataSources.accountsAPI.getUser(user.id);
    },
  },
  Listing: {
    host: ({ hostId }) => {
      return { id: hostId };
    },
    // ... other Listing resolvers
  },
  Booking: {
    // ... other Booking resolvers
    guest: ({ guestId }) => {
      return { id: guestId };
    },
  },
  Review: {
    author: (review) => {
      let role = "";
      if (review.targetType === "LISTING" || review.targetType === "HOST") {
        role = "Guest";
      } else {
        role = "Host";
      }
      return { __typename: role, id: review.authorId };
    },
  },
};

module.exports = resolvers;
