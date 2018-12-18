db.CollectionJS.insert({data:"data from script file"});
printjson(db.CollectionJS.find().toArray());