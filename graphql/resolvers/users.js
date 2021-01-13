const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const SECRET_KEY = 'some very secret key';
const { SECRET_KEY } = require('../../config.js');
const User = require('../../models/user.js');

const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators.js');

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();

function generateToken(user) {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			username: user.username
		}, 
		SECRET_KEY, 
		{ expiresIn: '1h' }
	);
}

module.exports = {
	Mutation: {
		async login(_, { username, password }){
			const {errors, valid} = validateLoginInput(username, password);
			if(!valid) {
				throw new UserInputError('errors are:',{errors});
			}

			const user = await client.db("merng").collection("users").findOne({username: username});
			console.log(user)

			if (!user){
				errors.general = 'user not found';
				throw new UserInputError('user not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if(!match){
				errors.general = 'wrong credentials';
				throw new UserInputError('wrong credentials', { errors });
			}

			const token = generateToken(user);
			console.log("Token:",token)
			return {
				_id: user._id,
				email: user.email,
				username: user.username,
				password: user.password,
				createdAt: user.createdAt,
				token};
		},
		async register(
			parent, 
			{registerInput: {username, email, password, confirmPassword}}, 
			context, 
			info
		) {
			//Validate user data
			const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
			if (!valid) {
				throw new UserInputError('errors are:', {errors});
			}

			//Make sure user doesn't exist
			//hash password and create auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			// const res = await newUser.save();
			const cursor = await client.db("merng").collection("users").insertOne(newUser);
			console.log(`New listing created with the following id: ${cursor.insertedId}`);
			console.log(cursor.ops[0])
			console.log(cursor.ops[0].password)
			console.log(SECRET_KEY)

			const token =  generateToken(cursor.ops[0])
			console.log("Token: ",token);

//OPS is the special word here
			return {
				_id: cursor.ops[0]._id,
				email: cursor.ops[0].email,
				username: cursor.ops[0].username,
				password: cursor.ops[0].password,
				createdAt: cursor.ops[0].createdAt,
				token};
		},

		async deleteUser(_, { username }) {

			try {
				const user = await User.find({username: username});
				console.log('user', user);
				console.log('Number of users:', user.length);
				await User.deleteMany({ username: username});
				return 'user deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		}

	}
}

// Put this in Apollo Server GUI
// mutation trysignon{
//   login(username:"ontario",password:"123456"){
//  		_id
//     email
//     username
//     createdAt
//     token
//   }
// }

// Put this in Postman GUI
// {
//     "query": "mutation{login(username:\"ontario\",password:\"123456\"){_id username token }}"
// }