"use strict";

var _graphqlYoga = require("graphql-yoga");

// type types
// Scalar types: String, Boolean, Int, Float, ID
// Collections: Object, Array

// type definitions (schema)
var typeDefs = "\n    type Query {\n        id: ID!\n        name: String!\n        age: Int!\n        employed: Boolean!\n        gpa(num: Int): Float\n        title: String!\n        price: Float!\n        rating: Int!\n        released: Int!\n        inStock: Boolean\n        posts: Post!\n    }\n";

// resolvers (functions)
//import GraphQLServer
var resolvers = {
    Query: {
        id: function id() {
            return "abc123";
        },
        name: function name() {
            return "D-Dogg Diggity Dogg";
        },
        age: function age() {
            return 54;
        },
        employed: function employed() {
            return true;
        },

        gpa: function gpa(_, _ref) {
            var num = _ref.num;
            return num / 100;
        },
        title: function title() {
            return "Return of the Jed Eye";
        },
        price: function price() {
            return 20.21;
        },
        inStock: function inStock() {
            return true;
        },
        rating: function rating() {
            return 5;
        },
        released: function released() {
            return 1999;
        }
    }

    // declare and start the server
};var server = new _graphqlYoga.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.start(function () {
    console.log("GraphQLServer is up on port 4000 ...");
});