


Say about mongo ref card
https://www.mongodb.com/collateral/quick-reference-cards?jmp=dfp&utm_medium=display&utm_source=docs&utm_campaign=QuickRefCardsOctober2015C


  sh.shardCollection("students.grades", {"student_id" : 1}) { "collectionsharded" : "students.grades", "ok" : 1 }
 

 //Create data directories for 3 Shard Servers & 1 for the config server
  mkdir c:\data\srx\db1
  mkdir c:\data\srx\db2
  mkdir c:\data\srx\db3

//Start Shard Servers on different ports
  mongod --shardsvr --port 10001 --dbpath c:\data\srx\db1
  mongod --shardsvr --port 10002 --dbpath c:\data\srx\db2
  mongod --shardsvr --port 10003 --dbpath c:\data\srx\db3

//Start config Server
  mongod.exe --configsvr --port 20000  --dbpath c:\data\configdb_2

//Using mongos start the Query Router for the config server and specify the chunk size
  mongos.exe --configdb localhost:20000 --port 20001 --chunkSize 1 

 //Connect to Router 
 mongo --port 20001 --host localhost
// Use admin Priveleges
 use admin
// Add shards
 db.runCommand( { addshard : "localhost:10001" } );
 db.runCommand( { addshard : "localhost:10002" } );
 db.runCommand( { addshard : "localhost:10003" } );

// Enable Sharding on DB and in Collection
 db.runCommand( { enablesharding  : "person_shard_DB" } );
 db.runCommand( { shardcollection : "person_shard_DB.details_collection", key : { Name : 1 } } );
 

 // populate data to the DB 
 use person_shard_DB
 // Insert Test Data





sh.status() 

 //  db.details_collection.ensureIndex({ Name : 1 });








