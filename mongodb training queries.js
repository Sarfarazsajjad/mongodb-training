//* Quick Reference Card
// https://www.mongodb.com/collateral/quick-reference-cards

//* mongodb

//* show dbs

//! create new or use one of the databases with use command

//! use <database name>

//! show collections inside a database with show collections command

//! do find operation on one of the collections with db.<collection name>.find()

//! the only difference between json and bson is that there are quotation marks on both key and value in bson and only value on json

//! db.<collection name>.find().pretty()

//! create collection

db.createCollection("cars")

//! insert into collection

db.cars.insert({
	name : 'honda',
	make : 'accord',
	year : '2010'
})

//! update

db.cars.update(
	{
		name: 'honda'
	},
	{
		$set:{
			name: 'ford'
		}
	}
)

//! add something new to the document

db.cars.update(
	{
		name: 'ford'
	},
	{
		$set:{
			transmission: 'automatic'
		}
	}
)

//! remove document

db.cars.remove({
	name: 'ford'
})

//! run javascript
for(var i = 0; i < 10; i++){db.things.insert({"x": i})}


//---------------------------------------------------------

db.student.insert({
    name: 'Joe',
    undergrad: true,
    units: 9,
    classes: ['geography', 'math', 'journalism']
})

db.student.insert({
    name: 'Jane',
    undergrad: false,
    units: 12,
    classes: ['geography', 'science', 'journalism', 'history']
})

db.student.insert({
    name: 'Kevin',
    undergrad: true,
    units: 3,
    classes: ['geography']
})

db.student.insert({
    name: 'Rachel',
    undergrad: false,
    units: 6,
    classes: ['geography', 'history']
})

db.student.find({})
db.student.find({'name': 'Rachel'})
db.student.find({units: {$gt: 6}})
db.student.find({units: {$lt: 7}})
db.student.find({classes: {$in: ['history']}})

db.student.find({classes: {$in: ['history']}}).sort({units: -1})    // ascending
db.student.find({}).sort({name: 1})    // descending

db.student.find({}).sort({name: 1}).limit(2)


//----------
//!Data Import
//----------

/*
mongoimport --db northwind --collection territories --type csv --file territories.csv --headerline
mongoimport --db northwind --collection employees --type csv --file employees.csv --headerline
mongoimport --db northwind --collection categories --type csv --file categories.csv --headerline
mongoimport --db northwind --collection customers --type csv --file customers.csv --headerline
mongoimport --db northwind --collection employee-territories --type csv --file employee-territories.csv --headerline
*/

//----------
//!Querying
//----------

//https://docs.mongodb.com/manual/reference/method/db.collection.find/
//https://docs.mongodb.com/manual/tutorial/query-documents/
//https://docs.mongodb.com/manual/reference/operator/projection/

db.regions.find({RegionDescription:"Northern"})
db.regions.find({RegionDescription:"Northern",RegionID:3})
db.regions.find({RegionDescription:"Northern",RegionID:3},{_id:0})
db.regions.find({RegionDescription:"Northern",RegionID:3},{_id:0,RegionID:0})
db.regions.find({RegionDescription:"Northern",RegionID:3},{_id:false,RegionID:0})

//!Count
//-----
db.regions.find({RegionDescription:"Northern",RegionID:3},{_id:false,RegionID:0}).count()
db.regions.find().count()

//!Limit
//-----
db.regions.find().limit(2)

//!Skip
//-----
db.regions.find().skip(2)

//!Skip and limit
//--------------
db.regions.find().skip(1).limit(1)

//!Sort
//-----
db.regions.find().sort({ RegionId:1 })
db.regions.find().sort({ RegionId:-1 })

//! Find object with Object Id
//------
db.test.insert({x: 1})
db.test.find({"_id" : ObjectId("4ecc05e55dd98a436ddcc47c")}) // explicit
db.test.find(ObjectId("4ecc05e55dd98a436ddcc47c"))           // shortcut


//----------------------------
//!Comparision Operators in Queries 
//----------------------------

//!Basic Comparision operators - less than, Greater than
//-----------------------
db.products.find({UnitPrice:{$lt:100}})
db.products.find({UnitPrice:{$gt:100}})
db.products.find({UnitPrice:{$eq:123.79}})

//!Multiple Conditions
//--------------------
//*this is an and operation between the condition
db.products.find({UnitPrice:{$gt: 50, $lt: 100}})

//*multi condition works a littebit different for arrays

//TODO End of Session 1 (4 hours)

//-----------------------------
//!Logical Operators
//-----------------------------

//!And Operation
//--------------
db.products.find({$and: [{Discontinued:1},{UnitPrice:{$gt: 100}}] })

//!Or Operation
//--------------
db.products.find({$or: [{Discontinued:1},{UnitsInStock:{$eq: 0}}] })


//----------------
//!Update Documents
//----------------
//*this will update the first document and replace the entire document

db.shippers_copy.update({},{Phone:'12345'})

//*right way using $set operator

db.shippers_copy.update({CompanyName:'United Package'},{$set: {Phone:'123456'}});

//*multi updates
db.shippers_copy.update({},{$set: {Phone:'zyx-12345'}},{multi:true})

db.shippers_copy.updateMany({},{$set: {Phone:'abc-12345'}})

db.shippers_copy.updateOne({},{$set: {Phone:'efg-12345'}})

db.shippers_copy.updateOne({CompanyName:'Some Company in Panama'},{$set: {Phone: 'hij-12345'}},{upsert:true})

//----------------
//!Delete Documents
//----------------
db.customers_copy.find({})

db.customers_copy.find({Country:'Mexico'})
db.customers_copy.find({Country:'Germany'})

db.customers_copy.distinct("Country")

db.customers_copy.deleteOne({Country:'Mexico'})

db.customers_copy.deleteMany({Country:'Mexico'})

db.customers_copy.remove({Country:'Germany'},{justOne:true})

db.customers_copy.remove({Country:'Germany'})

//----------------
//!Arrays
//----------------

//https://docs.mongodb.com/manual/tutorial/query-arrays/

db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
   { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
   { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
   { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);

//!Match an array
//--------------
db.inventory.find( { tags: ["red", "blank"] } )

//!Find an array that contains both the elements "red" and "blank", without regard to order or other elements
//----------------------------------------------------------------------------------------------------------
db.inventory.find( { tags: { $all: ["red", "blank"] } } )
//! this finds as or operation
db.inventory.find( { tags: { $in: ["red", "blank"] } } )


//!All documents where tags is an array that contains the string "red" as one of its elements:
//-------------------------------------------------------------------------------------------
db.inventory.find( { tags: "red" } )

db.inventory.find( {dim_cm:30})
db.inventory.find( {dim_cm:{$eq: 15.25}})

//TODO END OF SESSION 2 (8 hours)

//!Conditions on the elements in the array field
//---------------------------------------------
//*{ <array field>: { <operator1>: <value1>, ... } }

db.inventory.find( { dim_cm: { $gt: 25 } } )

//!Specify Multiple Conditions for array Elements
//----------------------------------------------

/*
 * Query an Array with Compound Filter Conditions on the Array Elements
 * -------------------------------------------------------------------- 
 * The following example queries for documents where the dim_cm array contains elements
 * that in some combination satisfy the query conditions; e.g., one element can satisfy
 * the greater than 15 condition and another element can satisfy the less than 20 condition,
 * or a single element can satisfy both:
*/
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

/*
 * Query for an Array Element that Meets Multiple Criteria
 * -------------------------------------------------------
 * Use $elemMatch operator to specify multiple criteria on the elements of an array such
 * that at least one array element satisfies all the specified criteria.
*/
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 15, $lt: 20 } } } )

//!Query for an Element by the Array Index Position
//-------------------------------------------------

db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

//!Query an Array by Array Length
//-------------------------------

db.inventory.find( { "tags": { $size: 3 } } )

//----------------------------------
//!Query an Array of Embedded Documents
//----------------------------------

db.inventory.insertMany( [

//    { item: "journal", instock: [ { qty: 5, warehouse: "A" },{ warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
   { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
   { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
   { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
   { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);

//* Equality matches on the whole embedded/nested document require an exact match
//* of the specified document
db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )
//* The following query does not match any documents in the inventory collection:
db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )

//* Workarround of the equlity match 
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )
db.inventory.find( { "instock": { $elemMatch: { warehouse: "A", qty: 5 } } } )

//! Specify a Query Condition on a Field in an Array of Documents
//---------------------------------------------------------------

//* Specify a Query Condition on a Field Embedded in an Array of Documents
db.inventory.find( { 'instock.qty': { $lte: 20 } } )

//* Use the Array Index to Query for a Field in the Embedded Document
db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )


//! Specify Multiple Conditions for Array of Documents
//------------------------------------------------
/* 
 * Use $elemMatch operator to specify multiple criteria on an array of embedded 
 * documents such that at least one embedded document satisfies all the specified criteria.
*/

//* A Single Nested Document Meets Multiple Query Conditions on Nested Fields
//------------------------------------------------

db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )
db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

//* Combination of Elements Satisfies the Criteria
//------------------------------------------------

/**
 * If the compound query conditions on an array field do not use the $elemMatch operator,
 * the query selects those documents whose array contains any combination of elements that
 * satisfies the conditions.
 *  */

 //the following query matches documents where any document nested in the instock array has
 // the qty field greater than 10 and any document (but not necessarily the same embedded
 // document) in the array has the qty field less than or equal to 20:
db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } )

// The following example queries for documents where the instock array has at least one
// embedded document that contains the field qty equal to 5 and at least one embedded
// document (but not necessarily the same embedded document) that contains the field
// warehouse equal to A:
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )

//------------------------------------------------
//! How to add values in an array
//------------------------------------------------

//* $push, $position, $each, $addToSet are used to add values in arrays

//to show just array the field
db.inventory.find( {},{dim_cm:true,_id:false})

//! $push
//* The $push operator appends a specified value to an array.
// { $push: { <field1>: <value1>, ... } }
db.inventory.update({},{$push: {dim_cm:95}})

//! $addToSet
//* The $addToSet operator adds a value to an array unless the value 
//* is already present, in which case $addToSet does nothing to that array.
// { $addToSet: { <field1>: <value1>, ... } }
db.inventory.update({}, { $addToSet: { dim_cm: 34 } }, { multi: true })

//! $each
//* Use with the $addToSet operator to add multiple values to an array <field>
//* if the values do not exist in the <field>.
//* Use with the $push operator to append multiple values to an array <field>.

//{ $addToSet: { <field>: { $each: [ <value1>, <value2> ... ] } } }
db.inventory.update({}, { $addToSet: {dim_cm:{$each: [94,95,96]}}}, {multi:true})
//{ $push: { <field>: { $each: [ <value1>, <value2> ... ] } } }
db.inventory.update({}, { $push: {dim_cm:{$each: [32,33,34,35]}}}, {multi:true})

//! $position
//* The $position modifier specifies the location in the array at which the $push
//* operator inserts elements. 
db.inventory.update({}, { $push: {dim_cm:{$each: [1,2,3],$position: 0}}}, {multi:true})

//! $pull
//* The $pull operator removes from an existing array all instances of a value or
//* values that match a specified condition.
//{ $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }

db.inventory.update({}, { $pull: {dim_cm:95}},{multi:true})
//* with condition
db.inventory.update({}, { $pull: {dim_cm:{$lt:5}}},{multi:true})
//* with multi condition
db.inventory.update({}, { $pull: {dim_cm:{$lt:90,$gt:33}}},{multi:true})

//! $pop
//{ $pop: { <field>: <-1 | 1>, ... } }

//pop from 0th index
db.inventory.update({},{ $pop: {dim_cm:-1}})
//pop from nth index
db.inventory.update({},{ $pop: {dim_cm:1}})

//! $in Operator
//* The $in operator selects the documents where the value of a field equals any value
//* in the specified array. To specify an $in expression, use the following prototype:
//* { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
db.inventory.update({dim_cm:{$in: [14,32]}},{$push: {dim_cm:2}},{multi:true});

//! $nin Operator
//* opposite of $in operator
db.inventory.update({dim_cm:{$nin:[10,15.25]}},{$push: {dim_cm:7}},{multi:true})

//! $all Operator
//* $all operator selects the documents where the value of a field equals all the values
//* in the specified array.
db.inventory.find({dim_cm:{$all:[32,32,2,7]}},{ dim_cm: true, _id: false })

$push, $position, $each
//https://docs.mongodb.com/manual/reference/operator/update/push/index.html
//https://docs.mongodb.com/manual/reference/operator/update/position/
//https://docs.mongodb.com/manual/reference/operator/update/each/

$in, $nin, $all
https://docs.mongodb.com/manual/reference/operator/query/in/index.html
//https://docs.mongodb.com/manual/reference/operator/query/nin/index.html
//https://docs.mongodb.com/manual/reference/operator/query/all/index.html?searchProperty=current&query=%23

$elemMatch
//https://docs.mongodb.com/manual/reference/operator/query/elemMatch/index.html

$pull,$pop,$addToSet
//https://docs.mongodb.com/manual/reference/operator/update/pull/
//https://docs.mongodb.com/manual/reference/operator/update/pop/
//https://docs.mongodb.com/manual/reference/operator/update/addToSet/


//------------------------------------------------
//! Document Validation
//------------------------------------------------
//https://docs.mongodb.com/manual/reference/method/db.createCollection/

//*validator object
{
    $and:[
        {
            total_purchase:{
                $gte:10000
            }
        },
        {
            country:{
                $in:['us','uk','brazil']
            }
        }
    ]
}

db.getCollection('AmazonSpecialOfferCustomers').find({})
db.AmazonSpecialOfferCustomers.insert({amzid:7878,total_purchase:11000,country:'uk'})
db.AmazonSpecialOfferCustomers.insert({amzid:7879,total_purchase:9000,country:'uk'})
db.AmazonSpecialOfferCustomers.insert({amzid:7880,total_purchase:11000,country:'peru'})
db.AmazonSpecialOfferCustomers.insert({amzid:7881,total_purchase:11900,country:'us'})


//check collection validation object
db.getCollectionInfos({name:'AmazonSpecialOfferCustomers'})

//https://docs.mongodb.com/manual/reference/method/db.runCommand/
//https://docs.mongodb.com/manual/reference/command/collMod/
//! collmod
// collMod makes it possible to add options to a collection or to modify view definitions.
// The command takes the following prototype form:
//* db.runCommand( { collMod: <collection or view>, <option1>: <value1>, <option2>: <value2> ... } )

db.runCommand({
    collMod: 'AmazonSpecialOfferCustomers',
    validator: {
        $and: [
            {
                total_purchase: {
                    $gte: 10000
                }
            },
            {
                country: {
                    $in: ['us', 'uk', 'brazil']
                }
            }
        ]
    }
})

db.createCollection("AmazonSpecialOfferCustomers", {
    validator: {
        $and: [
            {
                total_purchase: {
                    $gte: 10000
                }
            },
            {
                country: {
                    $in: ['us', 'uk', 'brazil']
                }
            }
        ]
    },
    validationLevel: "strict",
    validationAction: "error",
})

//how to validate invalid data in collection
// https://docs.mongodb.com/manual/reference/method/db.collection.validate/
// https://docs.mongodb.com/manual/reference/command/validate/
// https://www.w3resource.com/mongodb/shell-methods/collection/db-collection-validate.php
// https://stackoverflow.com/questions/39603228/validator-in-mongodb-does-not-work
// https://dba.stackexchange.com/questions/151215/use-cases-for-db-collection-validate-checks-the-structures-within-a-namespac
// https://dba.stackexchange.com/questions/160871/db-collection-validate-missing-output-and-verify-returned-ebusy-on-first-run

db.AmazonSpecialOfferCustomers.validate(true)
db.AmazonSpecialOfferCustomers.validate()
db.getCollectionInfos({name:"AmazonSpecialOfferCustomers"})
db.runCommand({ validate: "AmazonSpecialOfferCustomers", full:true,scandata:true })


//------------------------------------------------
//! Text Search
//------------------------------------------------
//https://docs.mongodb.com/manual/text-search/
//https://docs.mongodb.com/manual/reference/operator/query/text/#op._S_text
//https://docs.mongodb.com/manual/reference/operator/projection/meta/#proj._S_meta

db.stores.insert(
    [
      { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
      { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
      { _id: 3, name: "Coffee Shop", description: "Just coffee" },
      { _id: 4, name: "Café con", description: "Just coffee french" },
      { _id: 5, name: "Cafe con", description: "Just coffee america" },
      { _id: 6, name: "Clothes Clothes Clothes", description: "Discount clothing" },
      { _id: 7, name: "Java Shopping", description: "Indonesian goods" }
    ]
 )

db.stores.find({ $text: { $search: "java" } }); //this will give error without an index  

/**
 db.stores.createIndex(
   {"name": "text"},
   {
    background:true,//Specify true to build in the background.
    //unique:false, //Specify true to create a unique index. A unique index causes MongoDB to reject all documents that contain a duplicate value for the indexed field.
    //name: "",   //The name of the index.     
    //partialFilterExpression: { field: { $exists: true } }, // If specified, the index only references documents that match the filter expression
    //sparse:false, //If true, the index only references documents with the specified field. Starting in MongoDB 3.2, MongoDB provides the option to create partial indexes.  partial indexes should be preferred over sparse indexes.

    //expireAfterSeconds:0, //Specifies a value, in seconds, as a TTL to control how long MongoDB retains documents in this collection.
   }
   )
 */

//single field index
db.stores.createIndex({ name: "text" })
//multi field index
db.stores.createIndex({ name: "text", description: "text" })

//get index info
db.stores.getIndexes();

//drop index
db.stores.dropIndex('name_text') 
db.stores.dropIndex('name_text_description_text')

//! $text Operator
db.stores.find( { $text: { $search: "java coffee shop" } } )

//some interesting full text searches

//Stemming, Case insensitivity, relevence
db.stores.find({$text: { $search: "java" }});
db.stores.find({$text: { $search: "Clothing" }});
db.stores.find({$text: { $search: "Shopping" }});
db.stores.find({$text: { $search: "SHOP" }});

//! Stop words will be skipped
db.stores.find({$text: { $search: "the java." }}) //results will be same as just "java"

//! Multi words search
db.stores.find( { $text: { $search: "java coffee shop" } } )

 //! Exact Phrase
 db.stores.find( { $text: { $search: "java \"coffee shop\"" } } )

 //! Term Exclusion
 db.stores.find( { $text: { $search: "java shop -coffee" } } )

//! Case Sensitive Search
db.stores.find({ $text: { $search: "java coffee shop", $caseSensitive: true } })
db.stores.find({ $text: { $search: "java Coffee shop", $caseSensitive: true } })

//! Diacritic Sensitive
db.stores.find({ $text: { $search: "cafe", $diacriticSensitive: true } })
db.stores.find({ $text: { $search: "cafe", $diacriticSensitive: false } })

//! $meta textScore
db.stores.find(
    { $text: { $search: "java coffee shop" } },
    { score: { $meta: "textScore" } }
)

//! Sorting - $meta textScore
db.stores.find(
    { $text: { $search: "java coffee shop" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })

//! Wildcard Text Indexes https://docs.mongodb.com/manual/core/index-text/#wildcard-text-indexes
// db.collection.createIndex( { "$**": "text" } )

db.stores.createIndex( { "$**": "text" } )
db.getCollection('sent-comp').createIndex( { "$**": "text" } )

//text searching in large dataset https://github.com/google-research-datasets/sentence-compression
db.getCollection('sent-comp').getIndexes()
db.getCollection("sent-comp").createIndex({"headline": "text" })
db.getCollection('sent-comp').dropIndex('headline_text')
db.getCollection('sent-comp').createIndex( { "$**": "text" } )
db.getCollection('sent-comp').dropIndex('$**_text')

db.getCollection("sent-comp").stats({indexDetails:true});
 


//------------------------------------------------
//! Javascript in Mongodb
//------------------------------------------------

//create a database JSDemoDB
//create a collection CollectionJS

//! REPL Example

//Create 100 documents with random numbers using javascript with javascript libraries

for (let index = 0; index < 100; index++) {
    let doc = {};
    doc.randomNumber = Math.floor(Math.random()*100)+1;
    db.CollectionJS.insert(doc);
}

let greaterThanNumber = 50;
let searchQuery = {
    randomNumber:{$gt:greaterThanNumber}
}
db.CollectionJS.find(searchQuery)

//! Mongodb jsmethods and commands
//* https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

// show dbs, show databases
db.adminCommand('listDatabases')

// use <db>
db = db.getSiblingDB('<db>')

// show collections
db.getCollectionNames()

// show users
db.getUsers()

// show roles
db.getRoles({showBuiltinRoles: true})

// it
let cursor = db.CollectionJS.find()
if ( cursor.hasNext() ){
   cursor.next();
}

//! Cursor
//https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/
// https://docs.mongodb.com/manual/reference/method/js-cursor/


let cursor = db.getCollection('CollectionJS').find({})
//loop through cursor
while(cursor.hasNext()){
    printjson(cursor.next().randomNumber) //print the value
}

//!Cursor Copy data to another collection

let cursor = db.getCollection('CollectionJS').find({})
//loop through cursor
while(cursor.hasNext()){
    printjson(cursor.next().randomNumber); //print the value
    db.CollectionJSCopy.insert(cursor.next());
}

//! eval method Provides the ability to run JavaScript code on the MongoDB server.
// * (depricated in 3.0)
// https://docs.mongodb.com/manual/reference/command/eval/
/*
{
    eval: <function>,
    args: [ <arg1>, <arg2> ... ],
    nolock: <boolean>
  }
*/

// db.eval https://docs.mongodb.com/manual/reference/method/db.eval/

db.eval(function add(x,y){
    return x+y;
},
100,200
)

//get sum of all ducuments field
db.eval(
    function sum() {
        let sum_random = 0;
        cursor = db.getCollection('CollectionJS').find({});
        while (cursor.hasNext()) {
            sum_random += cursor.next().randomNumber;
        }
        return sum_random;
    }
)

//! Using system.js
// * https://docs.mongodb.com/manual/tutorial/store-javascript-function-on-server/
// * https://docs.mongodb.com/v3.2/reference/method/db.loadServerScripts/
db.system.js.save(
    {
        _id: "echoFunction",
        value: function (x) { return x; }
    }
)

db.system.js.save(
    {
        _id: "myAddFunction",
        value: function (x, y) { return x + y; }
    }
);
db.loadServerScripts();
myAddFunction(1,3)

db.system.js.save({
  _id: "sumOfRandom",
  value: function() {
    let sum_random = 0;
    cursor = db.getCollection("CollectionJS").find({});
    while (cursor.hasNext()) {
      sum_random += cursor.next().randomNumber;
    }
    return sum_random;
  }
});
db.loadServerScripts();
sumOfRandom();

//! Execute js script files
// * https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/#execute-a-javascript-file

/*
The load() method accepts relative and absolute paths. If the current working directory
 of the mongo shell is /data/db, and the myjstest.js resides in the /data/db/scripts 
 directory, then the following calls within the mongo shell would be equivalent:
*/

load("scripts/myjstest.js")
load("/data/db/scripts/myjstest.js")


//------------------------------------------------
//! GridFS
//------------------------------------------------

//! mongofiles utility
//* mongofiles <options> <commands> <filename>

//from the shell run
//mongofiles -d DB_GRIDFS put ~/Desktop/testfile.png
//mongofiles -d DB_GRIDFS list

// Find by name e.g. db.getCollection("images.files").find({filename:/name/i}).sort({_id:-1})
db.getCollection("images.files").find({filename:/profile picture/i}).sort({_id:-1})


//------------------------------------------------
//! Aggregation
//------------------------------------------------

// * Aggrigation Quick Reference
// https://docs.mongodb.com/manual/aggregation/
// https://docs.mongodb.com/manual/meta/aggregation-quick-reference/

//create a separate database for aggregation practice
//DB_Aggregation

db.webrank.insertMany([{"site":"google.com","visits":2.19426464e+08,"category":"search"},
{"site":"youtube.com","visits":2.09211168e+08,"category":"video"},
{"site":"facebook.com","visits":1.43421344e+08,"category":"social"},
{"site":"msn.com","visits":1.3487464e+08,"category":"portal"},
{"site":"bing.com","visits":1.12169608e+08,"category":"search"},
{"site":"yahoo.com","visits":1.06619176e+08,"category":"portal"},
{"site":"amazon.com","visits":8.6478e+07,"category":"business"},
{"site":"twitter.com","visits":8.635632e+07,"category":"portal"},
{"site":"yelp.com","visits":8.2077296e+07,"category":"social"},
{"site":"pinterest.com","visits":6.8081688e+07,"category":"social"},
{"site":"microsoft.com","visits":6.2076152e+07,"category":"business"},
{"site":"buzzfeed.com","visits":6.1257936e+07,"category":"news"},
{"site":"ebay.com","visits":5.9180008e+07,"category":"business"},
{"site":"answers.com","visits":5.051636e+07,"category":"info"},
{"site":"wikia.com","visits":4.6402732e+07,"category":"info"},
{"site":"live.com","visits":4.4029712e+07,"category":"mail"},
{"site":"wikipedia.org","visits":4.3087688e+07,"category":"info"},
{"site":"foxnews.com","visits":4.1724808e+07,"category":"news"},
{"site":"paypal.com","visits":3.9840264e+07,"category":"business"},
{"site":"linkedin.com","visits":3.7182368e+07,"category":"social"},
{"site":"wordpress.com","visits":3.1483602e+07,"category":"blog"},
{"site":"wayfair.com","visits":3.0322204e+07,"category":"business"},
{"site":"godaddy.com","visits":3.0007724e+07,"category":"business"},
{"site":"aol.com","visits":2.9526784e+07,"category":"portal"},
{"site":"walmart.com","visits":2.7471724e+07,"category":"business"},
{"site":"urbandictionary.com","visits":2.6579776e+07,"category":"portal"},
{"site":"bustle.com","visits":2.5817768e+07,"category":"info"},
{"site":"whitepages.com","visits":2.5308228e+07,"category":"search"},
{"site":"blogger.com","visits":2.4357936e+07,"category":"blog"},
{"site":"craigslist.org","visits":2.29686e+07,"category":"classified"},
{"site":"ranker.com","visits":2.2916572e+07,"category":"info"},
{"site":"legacy.com","visits":2.205306e+07,"category":"portal"},
{"site":"fandango.com","visits":2.1935104e+07,"category":"business"},
{"site":"comcast.net","visits":2.1555344e+07,"category":"business"},
{"site":"nytimes.com","visits":2.1331742e+07,"category":"news"},
{"site":"mozilla.org","visits":2.1234808e+07,"category":"business"},
{"site":"stackexchange.com","visits":2.0840396e+07,"category":"info"},
{"site":"vice.com","visits":2.0714488e+07,"category":"magazine"},
{"site":"about.com","visits":1.9717244e+07,"category":"info"},
{"site":"topix.com","visits":1.9623432e+07,"category":"info"},
{"site":"blogspot.com","visits":1.9451696e+07,"category":"blog"},
{"site":"tumblr.com","visits":1.9287978e+07,"category":"blog"},
{"site":"weather.com","visits":1.9153112e+07,"category":"info"},
{"site":"adobe.com","visits":1.9123388e+07,"category":"business"},
{"site":"imgur.com","visits":1.8623196e+07,"category":"image"}]);

// https://docs.mongodb.com/manual/reference/command/distinct/
// https://docs.mongodb.com/manual/reference/method/db.collection.distinct/

// https://docs.mongodb.com/manual/reference/command/group/
// https://docs.mongodb.com/manual/reference/method/db.collection.group/

db.webrank.count();
db.webrank.count({category:"search"})
db.webrank.distinct("category")

//! Aggregation Pipeline
// https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/
// https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/

//* Group Operator
// https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group
//* Expression 
// https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions
// Aggregation expressions use field path to access fields in the input documents. To specify
//  a field path, use a string that prefixes with a dollar sign $ the field name or the
//  dotted field name, if the field is in embedded document. For example, "$user" to
//  specify the field path for the user field or "$user.name" to specify the field 
// path to "user.name" field.
//* Sum operator

db.webrank.aggregate({
    $group: { _id: "$category", totalNumber: { $sum: 1 } }
})

//aggreated group by sum sort
db.webrank.aggregate({
    $group: { _id: "$category", totalNumber: { $sum: 1 } }
},
    { $sort: { totalNumber: -1 } }//decending order
)

//aggreated group by sum sort assending order
db.webrank.aggregate({
    $group: { _id: "$category", totalNumber: { $sum: 1 } }
},
    { $sort: { totalNumber: 1 } }//decending order
)

// aggregated group by avg
db.webrank.aggregate([{
    $group: { _id: "$category", avgVisit: { $avg: '$visits' } }
}])

//aggregated group by avg sort assending order
db.webrank.aggregate({
    $group: { _id: "$category", avgVisit: { $avg: '$visits' } }
},
    { $sort: { avgVisit: -1 } }
)

//aggreated group by avg sort assending order with limit
db.webrank.aggregate({
    $group: { _id: "$category", avgVisit: { $avg: '$visits' } }
},
    { $sort: { avgVisit: -1 } },
    { $limit: 5 }
)

//* $match operator
//* https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match

db.webrank.aggregate({
    $match: { category: "blog" }
})

//match with sort and limit
db.webrank.aggregate({
    $match: { category: "blog" }
},
    { $sort: { visits: -1 } },
    { $limit: 2 }
)

//using match with group
db.webrank.aggregate(
    { $group: { _id: "$category", totalVisits: { $sum: '$visits' } } },
    { $match: { totalVisits: { $gte: 100000 * 1000 } } } //more than 100 million
)


// lists all
db.webrank.aggregate()
db.webrank.aggregate([])

//* $project operator
db.webrank.aggregate([{ $project: { site: 1, visits: 1 } }]);
db.webrank.aggregate([{ $project: { _id: 0, site: 1, visits: 1 } }]);
db.webrank.aggregate([{ $project: { _id: 0, visits: 1, site: { $substr: ["$site", 0, 4] } } }]);

//sort by category then visits
db.webrank.aggregate([{ $project: {_id:0,site:1,visits:1,category:1}},
    {$sort:{category:1,visits:-1}}
    ]);

//top 2 categories
db.webrank.aggregate([
  {
    $group: {
      _id: { category: "$category" },
      visits: { $sum: "$visits" }
    }
  },
  { $sort: { visits: -1 } },
  { $limit: 2 }
]);

//* Official Aggrigation Examples
// https://docs.mongodb.com/manual/tutorial/aggregation-with-user-preference-data/
// https://docs.mongodb.com/manual/tutorial/aggregation-zip-code-data-set/

// * Aggregation Pipeline Stages
// https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/

// * Aggregation Pipeline Operators
// https://docs.mongodb.com/manual/reference/operator/aggregation/


//------------------------------------------------
//! Sharding
//------------------------------------------------

// 1. create directories
// 2. start sharding servers
// 3. start config server
// 4. start router server
// 5. add shards
// 6. enable sharding on DB and collection

//Create data directories for 3 Shard Servers & 1 for the config server
// *  mkdir c:\data\srx\db1
// *  mkdir c:\data\srx\db2
// *  mkdir c:\data\srx\db3

//Start Shard Servers on different ports
// *  mongod --shardsvr --port 10001 --dbpath c:\data\srx\db1
// *  mongod --shardsvr --port 10002 --dbpath c:\data\srx\db2
// *  mongod --shardsvr --port 10003 --dbpath c:\data\srx\db3

//Start config Server
// *  mongod.exe --configsvr --port 20000  --dbpath c:\data\configdb_2

//Using mongos start the Query Router for the config server and specify the chunk size
// *  mongos.exe --configdb localhost:20000 --port 20001 --chunkSize 1 

//Connect to Router 
//*  mongo --port 20001 --host localhost
// Use admin Priveleges
//*  use admin
// Add shards
 db.runCommand( { addshard : "localhost:10001" } );
 db.runCommand( { addshard : "localhost:10002" } );
 db.runCommand( { addshard : "localhost:10003" } );

// Enable Sharding on DB and in Collection
 db.runCommand( { enablesharding  : "person_shard_DB" } );
 db.runCommand( { shardcollection : "person_shard_DB.details_collection", key : { Name : 1 } } );
 

// populate data to the DB 
//*  use person_shard_DB
// Insert Test Data
for(i=0;i<50000;i++){
    db.details_collection.insert({Name:'Hello'+i, id: i+10, annual_income: 1000000+i});
}