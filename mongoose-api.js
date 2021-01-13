// https://thecodebarbarian.com/how-find-works-in-mongoose.html

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true});


const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// // kitty.save().then(() => console.log('meow'));

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Cat{
		_id: ID!
		name: String!
	}
	type Query{
		sayHi: String!
		getCats: Cat
		specialCat(catId: ID!): Cat
	}
`;

const resolvers = {
	Query:{	
		sayHi() {
			return "Hello World!!!!!!!!"
		},
		async getCats() {
			const result = await Cat.find();
			console.log('result:',result[0].name);
			return {name: result[0].name};
		},
		async specialCat(parent, {catId}, context, info) {
			const result = await Cat.findById(catId);
			console.log('special cat result:',result)
			return {name: result.name};
		}
	}
}



main().catch(error => console.log(error.stack));

async function main(){
	
	await displayall();

	const zildy='5fed1d41ee531b53883c815a';
	await searching(zildy);

}

async function displayall(){
	const docs = await Cat.find();
	console.log('Docs:', docs)
	docs.map(doc => doc.name).sort();
	console.log('Docs.map:', docs)
}

async function searching(catId){
	const docs = await Cat.findById(catId);
	console.log(`The cat with '${catId}': is called`, docs.name)
}

const server = new ApolloServer({ typeDefs, resolvers });

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// THIS ISN'T MONGOOSE, ITS REGULAR MONGODB
// https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
// var MongoClient = require('mongodb').MongoClient;
// url = 'mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority';
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("merng");
//   dbo.collection("cats").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// }); 