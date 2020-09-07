import pkg from 'graphql-yoga';
import database from './db/index.js';
import resolvers from './graphql/resolvers.js';
const { GraphQLServer } = pkg;
const { startDB, models } = database;

const MONGODB_HOST = process.env.MONGODB_HOST || '127.0.0.1';

const db = startDB({
    db: 'admin',
    user: 'enrique',
    pwd: 'enrique',
    url: `${MONGODB_HOST}:27017`
})

const context = {
    models,
    db,
};

const server = new GraphQLServer({
    typeDefs: `src/graphql/schema.graphql`,
    resolvers,
    context,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))