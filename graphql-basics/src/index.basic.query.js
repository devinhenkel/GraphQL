//import GraphQLServer
import { GraphQLServer } from 'graphql-yoga'



// type types
// Scalar types: String, Boolean, Int, Float, ID
// Collections: Object, Array

// type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa(num: Int): Float
        title: String!
        price: Float!
        rating: Int!
        released: Int!
        inStock: Boolean
        posts: Post!
    }
`


// resolvers (functions)
const resolvers = {
    Query: {
        id() {
            return "abc123"
        },
        name() {
            return "D-Dogg Diggity Dogg"
        },
        age() {
            return 54
        },
        employed() {
            return true
        },
        gpa: (_, {num}) => num/100,
        title() {
            return "Return of the Jed Eye"
        },
        price() {
            return 20.21
        },
        inStock() {
            return true
        },
        rating() {
            return 5
        },
        released() {
            return 1999
        }
    }
}

// declare and start the server
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("GraphQLServer is up on port 4000 ...")
})