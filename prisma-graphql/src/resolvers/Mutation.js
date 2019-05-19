import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId, {getUserRoles, getUserAdmin} from '../utils/getuserid'
import getUserToken from '../utils/getToken'
import { getTokenDesc } from 'graphql/language/lexer';
import { validatePassword, hashPassword } from '../utils/stringUtils';

/* const token = jwt.sign({ id: '123abc'}, 'mysecretkey')
console.log(token)

const decoded = jwt.decode(token)
console.log(decoded)

const verified = jwt.verify(token, 'mysecretkey')
console.log(verified) */

// JWT test code
/* const dummy = async () => {
    const username = 'devinhenkel'
    const password = 'Goofus3141'

    const hashedPassword = '$2a$10$SAdaQpXMWzOSiC/NdZA47.d5JSecw8qlJDAvMUxa3TnzceRvEL7Nm'

    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
    
}
dummy() */

const Mutation = {
    async createUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const isAdmin = await getUserAdmin(prisma, userId)
        if (!isAdmin) {
            throw new Error('Must be Admin to create users.')
        }

        const emailVal = require('email-validator')
        if(!emailVal.validate(args.data.email)) {
            throw new Error('Please enter a valid email address.')
        }

        let password = null
        
        if (validatePassword(args.data.password)) {
            password = await hashPassword(args.data.password)
        }
        
        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            }
        })
        //console.log(user)
        return {
            user: user,
            token: getUserToken(user.id)
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const isAdmin = await getUserAdmin(prisma, userId)
        if (!isAdmin) {
            throw new Error('Must be Admin to delete users.')
        }

        const userExists = await prisma.exists.User({
            id: args.id
        })
        console.log('user exists:'+userExists)
        if (!userExists) {
            throw new Error('No user with that ID was found. Please check the ID.')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        })
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const isAdmin = await getUserAdmin(prisma, userId)

        let currentId = userId
        if (args.where){
            if (!isAdmin) {
                throw new Error('You must be an admin to update a user')
            }
            if (args.where.id && isAdmin) { currentId = args.where.id }
        }

        let password = null
        if (validatePassword(args.data.password)) {
            password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: currentId
            },
            data: {
                ...args.data,
                password: password
            }
        }, info)
    },
    async updateUserRoles(parent, args, { prisma, request }, info) {
        const isAdmin = await getUserAdmin(prisma, userId)
        if (!isAdmin) {
            throw new Error('You are not authorized to perform this action.')
        }
        return prisma.mutation.updateUser({
            where: args.where,
            data: {
                roles: {
                    
                        ...args.roles
                    
                }
            }
        }, info)
    },
    async login(parent, args, { prisma, request }, info) {
        const userExists = await prisma.exists.User({
            email: args.data.email
        })

        if (!userExists) {
            throw new Error('No user with that email address was found. Please check your email address.')
        }

        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })
        
        const userAuth = await bcrypt.compare(args.data.password, user.password)

        if (!userAuth) {
            throw new Error('That password is not valid. Please try again.')
        }

        const userPayload = {
            user,
            token: getUserToken(user.id)
        }
        return userPayload
    },
    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        let opArgs = {
            ...args.data,
            author: {
                connect: {
                    id: userId
                }
            },
            published: args.data.published ? args.data.published : false
        }
        return prisma.mutation.createPost({
            data: opArgs
        }, info)
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const isAdmin = await getUserAdmin(prisma, userId)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if(!isAdmin) {
            if (!postExists) {
                throw new Error('Post does not exist, or you are not authorized to delete this post.')
            }
        }
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const isAdmin = await getUserAdmin(prisma, userId)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if(!isAdmin) {
            if (!postExists) {
                throw new Error('Post does not exist, or you are not authorized to delete this post.')
            }
        }
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)        
    },
    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({id: args.data.post})
        if (!postExists) {
            throw new Error('Post does not exist')
        }
        const post = await prisma.query.post({ where: { id: args.data.post}})
        if (!post.published) {
            throw new Error('Post not ready for comments')
        }

        const newComment = {}
        newComment.text = args.data.text
        newComment.author = {} 
        newComment.author.connect = {}
        newComment.author.connect.id = userId
        
        newComment.post = {} 
        newComment.post.connect = {}
        newComment.post.connect.id = args.data.post
        
        return prisma.mutation.createComment({
            data: newComment
        }, info)
    },
    async deleteComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.data.id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)           
    }
}

export { Mutation as default }