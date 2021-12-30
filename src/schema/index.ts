import { GraphQLSchema } from 'graphql';
import Mutations from './mutations';
import Query from './queries';

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutations,
});

export default schema;
