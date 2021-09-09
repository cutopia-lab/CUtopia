import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connect } from 'mongodb';
import dotenv from 'dotenv';

import typeDefs from './schemas';
import resolvers from './resolvers';
import createContext from './context';
import schemaDirectives from './directives';

dotenv.config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  ...schemaDirectives,
} as any);

const server = new ApolloServer({
  schema,
  context: req =>
    // To fake a lambda request context
    createContext({
      event: {
        headers: {
          Authorization: req.req.headers.authorization,
        },
        requestContext: {
          identity: {
            sourceIp: 'localhost',
          },
        },
      },
    }),
  introspection: true,
} as any);

const startApolloServer = async () => {
  await server.start();

  await connect(process.env.ATLAS_URI);
  const app = express();
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use(
    '/static',
    express.static(__dirname + '/data/static', {
      etag: true,
      setHeaders: (res, path, stat) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Headers', 'Accept');
      },
    }),
    (req, res) => {
      res.sendStatus(200);
    }
  );
  app.use(express.json());
  server.applyMiddleware({ app });
  app.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer();
