//import GraphQLServer
import { GraphQLServer } from 'graphql-yoga'

// data
let POSTS = [
    {
        id: '111',
        title: 'The Sun Also Rises',
        body: 'No it don\'t...',
        published: true
    },
    {
        id: '222',
        title: 'The Moon Also Sinks',
        body: 'Oh, yes it do.',
        published: true
    },
    {
        id: '333',
        title: 'Pluto is a dog planet',
        body: 'Bark, bark.',
        published: false
    }
]

let PEOPLE = [
    {
        id: '444',
        firstname: 'Devin',
        lastname: 'Henkel-Legare',
        email: 'devin@devinhenkel.com'
    },
    {
        id: '555',
        firstname: 'Laura',
        lastname: 'Legare',
        email: 'lauralegare@live.com'
    },
    {
        id: '666',
        firstname: 'Crusty',
        lastname: 'McNugget',
        email: 'crusty@mcnugget.com'
    }
]


// type types
// Scalar types: String, Boolean, Int, Float, ID
// Collections: Object, Array

// type definitions (schema)
const typeDefs = `
    type Query {
        me: Person!
        post(id: ID!): Post!
        posts: [Post!]
        people: [Person]
        person(id: ID!): Person!
        grades: [Int!]!
        add(numbers: [Float!]!): Float!
    }

    type Person {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`


// resolvers (functions)
const resolvers = {
    Query: {
        me() {
            return PEOPLE.find((person)=> person.id === "444")
        },
        // passed props (parent, args, context[state], info)
        post: (parent, args, context, info) => {
            return POSTS.find((post)=> post.id === args.id)
        },
        posts: () => {
            return POSTS
        },
        people: () => {
            return PEOPLE
        },
        person: (parent, args, context, info) => {
            return PEOPLE.find((person)=> person.id === args.id)
        },
        grades() {
            return [10,20,30,40,50,60,70,80,90]
        },
        add: (parent, args, context, info) => {
            if (args.numbers.length ===0) {
                return 0
            } else {
                return args.numbers.reduce((sum, current) => sum + current)
                
            }
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