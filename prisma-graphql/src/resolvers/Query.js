import jwt from 'jsonwebtoken'
import getUserId, {getUserRoles, getUserAdmin} from '../utils/getuserid'

const Query = {
    async me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)
        const userRoles = await getUserAdmin(prisma, userId)

        let opArgs = {}
        opArgs.where = { id: userId }
        return await prisma.query.user(opArgs, info)
    },
    // passed props (parent, args, context[state], info)
    async post(parent, args, { prisma, request }, info) {
        const userId = await getUserId(request, false)
        let opArgs = {}

        opArgs.where = {
            id: args.where.id
        }
        return prisma.query.post(opArgs, info)
    },
    async posts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)
        
        let opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }

        if (args.query) {
            opArgs.where = {
                OR:[
                    {title_contains: args.query},
                    {title_contains: args.query.toUpperCase()},
                    {title_contains: args.query.toLowerCase()},
                    {body_contains: args.query},
                    {body_contains: args.query.toUpperCase()},
                    {body_contains: args.query.toUpperCase()}
                ]
            }
        }

        if (!userId) {
            opArgs.where = {
                ...opArgs.where,
                published: true
            }
            return prisma.query.posts(opArgs, info)
        }

        const isAdmin = await getUserAdmin(prisma, userId)
        
        if (!isAdmin){
            opArgs.where = {
                ...opArgs.where,
                OR: [
                    {
                        author: {
                            id: userId
                        }
                    },
                    { published: true}
                ]
            }
        }
        return prisma.query.posts(opArgs, info)
    },
    async myPosts(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        let opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }
        
        opArgs.where = {
            author: {
                id: userId
            }
        }

        if (args.query) {
            opArgs.where = {
                ...opArgs.where,
                OR:[
                    {title_contains: args.query},
                    {title_contains: args.query.toUpperCase()},
                    {title_contains: args.query.toLowerCase()},
                    {body_contains: args.query},
                    {body_contains: args.query.toUpperCase()},
                    {body_contains: args.query.toUpperCase()}
                ]
            }
        }
        return await prisma.query.posts(opArgs, info)

    },
    async users(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)
        const isAdmin = await getUserAdmin(prisma, userId)

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }

        /* if (!isAdmin) {
            opArgs.where = { id: userId }
            return prisma.query.users(opArgs, info)
        }  */

        if (args.query) {
            opArgs.where = {
                OR:[
                    {firstname_contains: args.query},
                    {firstname_contains: args.query.toUpperCase()},
                    {firstname_contains: args.query.toLowerCase()},
                    {lastname_contains: args.query},
                    {lastname_contains: args.query.toUpperCase()},
                    {lastname_contains: args.query.toUpperCase()}
                ]
            }
        }
        return prisma.query.users(opArgs, info)
        
    },
    user: (parent, args, { prisma }, info) => {
        let opArgs = {}
        if(args.where) {
            opArgs.where = args.where
        }
        return prisma.query.user(opArgs, info)
    },
    comments(parent, args, { db, prisma }, info) {
        let opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }
        if(args.where) {
            opArgs.where = args.where
        }
        return prisma.query.comments(opArgs, info)
        /* return db.COMMENTS */
    },
    comment: (parent, args, { db }, info) => {
        return db.COMMENTS.find((comment)=> comment.id === args.id)
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

export { Query as default }