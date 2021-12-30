import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/index';

dotenv.config({ path: `${process.cwd()}/.env` });

const app = express();

app.use(cors());

app.get('/', (_) => {
  console.log((_ as any).verfiedUser);
});

app.use(
  '/graphql',
  graphqlHTTP({ schema, graphiql: true })
);

app.listen(3000, () => {
  console.log('App running on port 3000');
});
