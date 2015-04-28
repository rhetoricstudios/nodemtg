var mongo = require('mongodb');

var dbName = 'magicdb';
var collectionName = 'cards';

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(dbName, server);

db.open(function(err, db) {
    if(!err) {
        console.log("connected to " + dbName + " database.");
        db.collection(collectionName, {string: true}, function(err, collection) {
            if (err) {
                console.log("Collection " + collectionName + " does not exist.");
            }
            if(collection != null) {
                console.log("Collection " + collectionName + " does exist.");
            }
            collection.findOne({"name": "Elvish Mystic" }, function(err, item) {
                console.log(item);
            });
        });
    }
});

exports.findAll = function(req, res) {
	console.log("Finding the one...");
    db.collection(collectionName, function(err, collection) {
        collection.findOne({ 'name': 'Elvish Mystic' }, function(err, item) {
            res.send(item);
        	console.log("Found him!");
        });
        res.send("Nothing to show.");
    	console.log("Couldn't find him!");
    });
};

exports.findByName = function(req, res) {
    var name = req.params.name;
    console.log("Search this shit! " + name);
    var name_search_str = ".*"
    name_search_str = name_search_str.concat(name.split(' ').join(".*"), ".*");
    console.log("NO! Search this shit! " + name_search_str);
    
    db.collection(collectionName, function(err, collection) {
        collection.find( { 'name': { $regex : new RegExp(name_search_str, "i") } } ).toArray( function(err, items) {           
            console.log("Found some shit! " + JSON.stringify(items));
            
            res.send(items); 
        });
    });
};
/*{ $regex : new RegExp(name_search_str, "i") }*/
//exports.findById = function(req, res) {
//    var id = req.params.id;
//    console.log('Retrieving card: ' + id);
//    db.collection(collectionName, {string: true}, function(err, collection) {
//        collection.find({'name': 'Elvish Mystic' }, function(err, item) {
//            res.send(item);
//            console.log(item);
//        });
//    });
//};

//exports.findById = function(req, res) {
//    res.send({id:req.param.id, name: "The Name", description: "The Description"});
//};

//exports.findByName = function(req, res) {
//    var name = req.params.name;
//    db.collection(collectionName, function(err, collection) {
//        collection.findOne({'name': new BSON.ObjectName(name)}, function(err, item) {
//            res.send(item);
//        });
//    });
//}