//import GraphQLServer
import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Person from './resolvers/Person'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription'
import './prisma.js'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Person,
        Post,
        Comment
    }, 
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log("GraphQLServer is up on port 4000 ...")
})