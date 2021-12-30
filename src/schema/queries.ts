import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { Post, User } from './typeDefs';
import userData from '../data/userData';
import postData from '../data/postData';

const Query = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Query type',
  fields: () => {
    return {
      users: {
        type: GraphQLList(User),
        resolve() {
          return userData;
        },
      },

      user: {
        type: User,
        args: { id: { type: GraphQLID } },
        resolve(_, args) {
          return Promise.resolve(
            userData.find((user) => user.id === args.id)
          );
        },
      },

      post: {
        type: Post,
        args: {
          id: { type: GraphQLID },
        },
        resolve(_, args) {
          return postData.find(
            (post) => post.id === args.id
          );
        },
      },
    };
  },
});

export default Query;
