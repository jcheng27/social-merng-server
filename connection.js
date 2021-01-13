// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await listDatabases(client);

        await findOneListingByName(client,"jethro");

        await displayEverything(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {

    result = await client.db("merng").collection("posts").findOne({ username: nameOfListing });

    if (result) {

        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);

        console.log(result);

    } else {

        console.log(`No listings found with the name '${nameOfListing}'`);

    }

}


async function displayEverything(client) {

	const cursor = await client.db("merng").collection("posts").find({});

	const result = await cursor.toArray();

	console.log('Here is everything:', result);

}