import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import commentData from '../data/commentData';
import postData from '../data/postData';
import userData from '../data/userData';

import { UnwrapArray } from '../util/types';
const User = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const Post: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type',
  fields: () => ({
    id: { type: GraphQLID },
    author: {
      type: User,
      resolve(parent) {
        return userData.find(
          (user) => user.id === parent.authorId
        );
      },
    },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    comments: {
      type: GraphQLList(Comment),
      resolve(parent: UnwrapArray<typeof postData>) {
        const resolveComments = parent.commentIds
          .map((id) =>
            commentData.find((data) => data.id === id)
          )
          .filter(Boolean) as typeof commentData;

        return resolveComments;
      },
    },
  }),
});

const Comment: GraphQLObjectType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment Type',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    post: {
      type: Post,
      resolve(parent) {
        return postData.find(
          (post) => post.id === parent.postId
        );
      },
    },
  }),
});

export { User, Post, Comment };
