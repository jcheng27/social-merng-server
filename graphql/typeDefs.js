const { gql } = require('apollo-server')

module.exports = gql`
	type Post{
		_id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment]!
		likes: [Like]!
		commentCount: Int!
		likeCount: Int!
	}
	type Comment{
		_id: ID!
		createdAt: String!
		username: String!
		body: String!
	}
	type Like{
		_id: ID!
		createdAt: String!
		username: String!
	}
	type Query{
		sayHi: String!
		getPosts: [Post]
		getPost(postId: ID!): Post
    	books: [Book]
	}
	type User{
		_id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}
	input RegisterInput{
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type Mutation{
		register(registerInput: RegisterInput): User!
		login(username:String!, password:String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
		deleteUser(username: String!): String!
		createBook(title: String, author: String): Book
	}

 	type Book {
    	title: String
    	author: String
  	}

`;