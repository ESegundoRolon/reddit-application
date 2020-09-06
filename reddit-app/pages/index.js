import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { Subreddits } from "../components/Subreddits";

const Home = ({ data }) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <Subreddits />
      </div>
    </ApolloProvider>
  );
};

export default Home;