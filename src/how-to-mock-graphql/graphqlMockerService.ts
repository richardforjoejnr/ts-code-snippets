import { ApolloServer, gql } from 'apollo-server';
import {PRODUCTS_QUERY} from './GraphQLQueries'

const typeDefs = gql+PRODUCTS_QUERY;

const server = new ApolloServer({
  typeDefs,
  mocks: true
});

server.listen().then(({ url }) => console.log(`Server running on ${url}`));