import uuid from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        return prisma.mutation.createUser({ 
            data: args.data 
        }, info)
    },
    async deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createPost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.createPost({
            data: args.data
        }, info)
    },
    async deletePost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)        
    },
    async createComment(parent, args, { prisma, pubsub }, info) {
        const newComment = {}
        newComment.text = args.data.text
        newComment.author = {} 
        newComment.author.connect = {}
        newComment.author.connect.id = args.data.author
        
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