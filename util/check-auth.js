const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');

module.exports = (context) => {
	// context = {... headers}
	const authHeader = context.req.headers.authorization;
	if (authHeader){
		// Bearer
		const token = authHeader.split('Bearer ')[1];
		console.log('token is:',token)
		if (token){
			try{
				const user = jwt.verify(token, SECRET_KEY);
				return user;
			} catch(err) {
				throw new AuthenticationError('invalid/expired token');
			}
		}	
		throw new Error('authentication must be \'Bearer [token]');
	}
	throw new Error('authentication header must be provided');
}