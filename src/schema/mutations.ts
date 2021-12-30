import {
  GraphQLFieldConfig,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import commentData from '../data/commentData';
import postData from '../data/postData';

import { Post, Comment } from './typeDefs';

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: () => ({ updatePost, removePost }),
});

export default Mutations;

const updatePost: GraphQLFieldConfig<any, any, any> = {
  type: Post,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve(_, { id, ...payload }) {
    let postFileId = postData.findIndex(
      (post) => post.id === id
    );
    if (postFileId != -1) {
      const post = { ...postData[postFileId], ...payload };
      postData.splice(postFileId, 0, post);
      return post;
    }
    return null;
  },
};

const removePost: GraphQLFieldConfig<any, any, any> = {
  type: Comment,
  args: { commentId: { type: GraphQLID } },
  resolve(_, args) {
    const commentFileIndex = commentData.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (commentFileIndex !== -1) {
      return commentData.splice(commentFileIndex, 1).at(0);
    }
    return null;
  },
};
