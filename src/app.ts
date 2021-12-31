import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/index';

dotenv.config({ path: `${process.cwd()}/.env` });

const app = express();

app.use(cors());

app.get('/', (_, res) => {
  res.json({
    message:
      'To access the data point, simply use /graphql',
  });
});

app.use(
  '/graphql',
  graphqlHTTP({ schema, graphiql: true })
);

app.listen((process as any).env.PORT || 3000, () => {
  console.log('App running on port 3000 or default ports');
});
