const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();

//getPost will be through mongoose
const Post = require('../../models/Post.js');

const checkAuth = require('../../util/check-auth.js');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
	Query:{	
		sayHi() {
			return "Hello World!!!!"
		},
		async getPosts() {
			try {
        		const posts = await Post.find({}).sort({ createdAt: -1 });
        		return posts;
      		} catch (err) {
        		throw new Error(err);
     		}

			// old way without mongoose
			// const cursor = await client.db("merng").collection("posts").find({});
			// const result = cursor.toArray();
			// console.log(result);
			// return result;
		},
		async getPost(_, {postId}) {
			try {
				const post = await Post.findById(postId);
				console.log(post);
				if (post) {
					return post;
				} else {
					throw new Error('post not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		async createPost(_, {body}, context) {
			const user = checkAuth(context);
			console.log('after checkAuth:',user);

			if (body.trim() === '') {
				throw new Error('Post must not be empty');
			}

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString()
			});

			const post = await newPost.save();

			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (user.username === post.username) {
					await post.delete();
					return 'post deleted successfully';
				} else {
					throw new AuthenticationError('action not allowed. you are not author of the post');
				}

			} catch (err) {
				throw new Error(err);
			}
		},
		async likePost(_, { postId }, context){
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);
			if (post) {
				if(post.likes.find(like => like.username === username)) {
					// Post is already liked, clicking will unlike it by removing this user's like
					post.likes = post.likes.filter(like => like.username !== username);
				} else {
					// User has not liked the post yet, clicking will add user to likes array
					post.likes.push({
						username,
						createdAt: new Date().toISOString()
					})
				}

				await post.save();
				return post;
			} else throw new UserInputError('Post not found');
		}
	}
};



// In ApolloServer GUI
// {
//   getPosts{
//     _id
//     username
//     body
//     createdAt
//   }
// }