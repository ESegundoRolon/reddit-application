// Apollo
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Home } from "../containers/Home";
// Instantiate required constructor fields
const cache = new InMemoryCache();
const url = process.env.MIDDLEWARE_HOST ? `http://${process.env.MIDDLEWARE_HOST}/` : 'http://localhost:4000/';
const link = createHttpLink({
  uri: url,
});
const RootContainer = ({ data }) => {
  const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: link,
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <Home />
      </div>
    </ApolloProvider>
  );
};

export default RootContainer;