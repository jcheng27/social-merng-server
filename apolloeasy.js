// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver

const { ApolloServer, gql } = require('apollo-server');

// Hardcoded data store
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Schema definition
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

// Resolver map
const resolvers = {
  Query: {
    books() {
      return books;
    }
  },

  //added this or else addBook doens't work, you idiot!
  Mutation: {
    // 2
    addBook: (parent, args) => {
       const book = {
        title: args.title,
        author: args.author,
      }
      books.push(book)
      return book
   }
  }
};

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers });

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// In ApolloServer GUI

// query InsertAnythingHereBlah {
//   books {
//     title
//     author 
//   }
// }