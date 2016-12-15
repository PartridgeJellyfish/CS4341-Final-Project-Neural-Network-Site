var sqlite3 = require('sqlite3');

// create database
var db = new sqlite3.Database('PUFFINFINGER.sqlite');

db.serialize(function() {

    // making the table
    db.run("CREATE TABLE users (username varchar(30), password varchar(512), email varchar(80), salt varchar(30))");

    db.run("CREATE TABLE networks (username varchar(30), network varchar(100))");

    // adding data
    db.run("INSERT INTO users VALUES ('Zim', '8ab7d68e07296d519d8aff15eb7f32f20bb8116dd0b8bca5a0123f247ab308f5f6d5571c51caaaba86b954213168bca8f982466abcf9ab15dd71194baf473fb0', 'zimhey1@gmail.com', 'Puffins')");
    db.run("INSERT INTO users VALUES ('Seed', '8ab7d68e07296d519d8aff15eb7f32f20bb8116dd0b8bca5a0123f247ab308f5f6d5571c51caaaba86b954213168bca8f982466abcf9ab15dd71194baf473fb0', 'zimheey1@gmail.com', 'Puffins')");
    

    var users = [];
    // querying data
    db.each("SELECT username, email FROM users", function(err, row) {
      console.log(row.username + ": " + row.email);
        users.push(row);
    }, function(err, cntx) {
        console.log(cntx);
        console.log(users);
    });
    
    db.each("SELECT username, network FROM networks", function(err, row) {
      console.log(row.username + ": " + row.network);
    });

});

db.close();
