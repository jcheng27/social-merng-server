// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver

const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers/index.js')

const { MONGODB } = require('./config.js')


//Connecting to MongoDB
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
mongoose.connect(MONGODB, {useNewUrlParser: true,  useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Mongoose Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
	context: ({req}) => ({req}),
});

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Apollo Server ready at ${url}`);
});
