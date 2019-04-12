//import GraphQLServer
import { GraphQLServer } from 'graphql-yoga'
import uuid from 'uuid/v4'
import { userInfo } from 'os';

// data
let POSTS = [
    {
        id: '111',
        title: 'The Sun Also Rises',
        body: 'No it don\'t...',
        published: true,
        author: '444'
    },
    {
        id: '222',
        title: 'The Moon Also Sinks',
        body: 'Oh, yes it do.',
        published: true,
        author: '444'
    },
    {
        id: '333',
        title: 'Pluto is a dog planet',
        body: 'Bark, bark.',
        published: false,
        author: '666'
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

let COMMENTS = [
    {
        id: '001',
        text: 'Looky loo!',
        author: '555',
        post: '111'
    },
    {
        id: '002',
        text: 'Flap-doodle!',
        author: '555',
        post: '111'
    },
    {
        id: '003',
        text: 'What the what?!?',
        author: '444',
        post: '333'
    }
]


// type types
// Scalar types: String, Boolean, Int, Float, ID
// Collections: Object, Array

// type definitions (schema)
// moved to schema.graphql


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
        posts: (parent, args, context, info) => {
            let filteredPosts = ''
            if (!args.query) {
                filteredPosts = POSTS
            } else {
                filteredPosts = POSTS.filter((post) => {
                    return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.query.toLowerCase())
                })
            }
            if (!args.sort) {
                return filteredPosts
            }

            return filteredPosts.sort((a,b) => {
                if (args.sortdir === -1) {
                    return (a[args.sort] < b[args.sort]) ? 1 : ((b[args.sort] < a[args.sort]) ? -1 : 0)
                } else {
                    return (a[args.sort] > b[args.sort]) ? 1 : ((b[args.sort] > a[args.sort]) ? -1 : 0)
                }
                
            })
        },
        people: (parent, args, context, info) => {
            if (!args.query) {
                return PEOPLE
            } 
            
            return PEOPLE.filter((person) => {
                return person.lastname.toLowerCase().includes(args.query.toLowerCase()) || 
                person.firstname.toLowerCase().includes(args.query.toLowerCase()) || 
                person.email.toLowerCase().includes(args.query.toLowerCase())

            })
            
        },
        person: (parent, args, context, info) => {
            return PEOPLE.find((person)=> person.id === args.id)
        },
        comments() {
            return COMMENTS
        },
        comment: (parent, args, context, info) => {
            return COMMENTS.find((comment)=> comment.id === args.id)
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
    },
    Mutation: {
        createPerson(parent, args, context, info) {
            const emailTaken = PEOPLE.some((person) => person.email === args.email)
            if (emailTaken) {
                throw new Error('Email taken.')
            }
            
            const newUser = {
                id: uuid(),
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email
            }
            PEOPLE.push(newUser) 
            return newUser
            
        },
        addPost(parent, args, context, info) {
            const userExists = PEOPLE.some((person) => person.id === args.author)
            if (!userExists) { throw new Error('User does not exist') }
            const newPost = {
                id: uuid(),
                title: args.title,
                body: args.body,
                published: false,
                author: args.author
            }
            POSTS.push(newPost)
            return newPost
        },
        setPostStatus(parent, args, context, info) {
            let tempPost = POSTS.find((post) => {
                return post.id === args.id
            })
            if (tempPost) {
                tempPost.published = args.published
            }
            return tempPost
        },
        addComment(parent, args, context, info) {
            const userExists = PEOPLE.some((person) => {
                return person.id === args.author
            })
            const postExists = POSTS.some((post) => {
                return post.id === args.post && post.published === true
            })
            if (!userExists) {
                throw new Error(`Person does not exist`)
            }
            if (!postExists) {
                throw new Error('Post does not exist or is not published')
            }
            let newComment = {
                id: uuid(),
                text: args.text,
                author: args.author,
                post: args.post
            }
            COMMENTS.push(newComment)
            return newComment
        }
    },
    Post: {
        // resolver for author in Post object
        author(parent, args, context, info) {
            return PEOPLE.find((person) => {
                return parent.author === person.id;
            })
        },
        comments(parent, args, context, info) {
            return COMMENTS.filter((comment) => {
                return parent.id === comment.post;
            })
        }
    },
    Person: {
        // resolver for posts in Person object
        posts(parent, args, context, info) {
            return POSTS.filter((post) => {
                return parent.id === post.author;
            })
        },
        comments(parent, args, context, info) {
            return COMMENTS.filter((comment) => {
                return parent.id === comment.author;
            })
        }
    },
    Comment: {
        author(parent, args, context, info) {
            return PEOPLE.find((person) => {
                return parent.author === person.id;
            })
        },
        post(parent, args, context, info) {
            return POSTS.find((post) => {
                return parent.post === post.id;
            })
        }
    }
}

// declare and start the server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log("GraphQLServer is up on port 4000 ...")
})