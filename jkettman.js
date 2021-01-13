const { ApolloServer, gql } = require('apollo-server');

const users = [
  {
    id: '1',
    token: 'token-for-maurice-moss',
    firstName: 'Maurice',
    lastName: 'Moss',
    email: 'maurice@moss.com',
    password: 'abcdefg',
    roles: ['USER'],
  },
  {
    id: '2',
    token: 'token-for-roy-trenneman',
    firstName: 'Roy',
    lastName: 'Trenneman',
    email: 'roy@trenneman.com',
    password: 'imroy',
    roles: ['USER', 'ADMIN'],
  },
  {
    id: '3',
    token: 'token-for-jen-barber',
    firstName: 'Jen',
    lastName: 'Barber',
    email: 'jen@barber.com',
    password: 'qwerty',
    roles: ['USER'],
  }
];
getUserByToken: (token) => users.find((user) => user.token === token)


const messages = [
  {
    id: '1',
    senderId: '2',
    receiverId: '3',
    text: 'Hey Jen, how are you doing?',
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '2',
    text: 'Hi Roy, I\'m doing great! How are you?',
  },
];

const getById = (id) => messages.find((message) => message.id === id);

const getParticipantIds = (id) => {
  const message = getById(id);

  if (!message) {
    return [];
  }

  return [
    message.senderId,
    message.receiverId,
  ];
}


const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }
  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    roles: [Role]
    message(id: ID!): Message
  }
  type Query {
    currentUser: User
  }
`;

const resolvers = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id)
  },
  Query: {
    currentUser: (parent, args, context) => context.user
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
  	console.log(req)
  	return 'hi'
    // const token = req.headers.authorization;
    // const currentUser = User.getUserByToken(token);
    // return { user: currentUser, User, Message }
  },
});

// const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});