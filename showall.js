var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://jcheng:vWPGbP6FqjKF028g@cluster0.bzghi.mongodb.net/merng?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("merng");
  dbo.collection("posts").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});