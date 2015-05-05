var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var dbName = 'magicdb';
var collectionName = 'cards';

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('192.168.1.156', 27017, {auto_reconnect: true});
var db = new Db(dbName, server);

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
    	console.log("Couldn't find him!");
    });
};

exports.findByName = function(req, res) {
    var name = req.params.name;
    console.log("Search this shit! " + name);
    var name_search_str = ".*";
    name_search_str = name_search_str.concat(name.split(' ').join(".*"), ".*");
    console.log("NO! Search this shit! " + name_search_str);
    
    db.collection(collectionName, function(err, collection) {
        collection.find( { 'name': { $regex : new RegExp(name_search_str, "i") } } ).toArray( function(err, items) {           
            console.log("Found some shit! " + JSON.stringify(items));
            res.send(items); 
        });
    });
};

exports.findById = function(req, res) {
    var itemId = new BSON.ObjectID(req.params.id);
    console.log("Looking for item with itemId = " + itemId);
    db.collection(collectionName, function(err, collection) {
        collection.findOne({ '_id': itemId }, function(err, item) {
            res.send(item);
            console.log("found the one");
        });
    });
};

exports.findByParams = function(req,res) {
	var params = req.query;
    if('name' in params) {
        var name = params.name;
        var name_search_str = ".*";
        name_search_str = name.concat(name.split(' ').join(".*"), ".*"); 
    
        db.collection(collectionName, function(err, collection) {
            collection.find( { 'name': { $regex : new RegExp(name_search_str, "i") } } ).toArray( function(err, items) {           
                res.send(items); 
            });
        });
    }
	console.log('Got some params: ' + params.stringify());
};