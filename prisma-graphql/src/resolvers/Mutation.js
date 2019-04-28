import uuid from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email })
        if (emailTaken) {
            throw new Error('Email taken.')
        }

        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async deleteUser(parent, args, { db }, info) {
        const userExists = await prisma.exists.User({id: args.data.id})
        if (!userExists){
            throw new Error('User not found')
        }

        return prisma.mutation.deleteUser({data:args.data}, info)
    },
    async updateUser(parent, args, { db }, info) {
        const userExists = await prisma.exists.User({id: args.data.id})
        if (!userExists){
            throw new Error('User not found')
        }

        return prisma.mutation.updateUser({data:args.data}, info)
    },
    addPost(parent, args, { db, pubsub }, info) {
        const userExists = db.PEOPLE.some((person) => person.id === args.data.author)
        if (!userExists) { throw new Error('User does not exist') }
        const newPost = {
            id: uuid(),
            published: false,
            ...args.data
        }
        db.POSTS.push(newPost)
        //pubsub.publish(`posts`, { posts: {mutation: 'CREATED', data: newPost}}) 
        return newPost
    },
    deletePost(parent, args, { db, pubsub }, info) {
        const postIndex = db.POSTS.findIndex((post) => post.id === args.id)
        if (postIndex === -1) {
            throw new Error('Post not found')
        }

        const [deletedPost] = db.POSTS.splice(postIndex, 1)
        db.COMMENTS = db.COMMENTS.filter((comment) => comment.post !== args.id)
        if(deletedPost.published){
            pubsub.publish(`posts`, { posts: {mutation: 'DELETED', data: deletedPost}})
        }
        return deletedPost
    },
    updatePost(parent, args, { db, pubsub }, info) {
        const postIndex = db.POSTS.findIndex((post) => post.id === args.id)
        if (postIndex === -1) {
            throw new Error('Post not found')
        }

        db.POSTS[postIndex] = Object.assign(db.POSTS[postIndex], args.data)
        if(db.POSTS[postIndex].published){
            pubsub.publish(`posts`, { posts: {mutation: 'UPDATED', data: db.POSTS[postIndex]}}) 
        }
        return db.POSTS[postIndex]        
    },
    setPostStatus(parent, args, { db }, info) {
        let tempPost = db.POSTS.find((post) => {
            return post.id === args.id
        })
        if (tempPost) {
            tempPost.published = args.published
        }
        return tempPost
    },
    addComment(parent, args, { db, pubsub }, info) {
        const userExists = db.PEOPLE.some((person) => {
            return person.id === args.data.author
        })
        const postExists = db.POSTS.some((post) => {
            return post.id === args.data.post && post.published === true
        })
        if (!userExists) {
            throw new Error(`Person does not exist`)
        }
        if (!postExists) {
            throw new Error('Post does not exist or is not published')
        }
        let newComment = {
            id: uuid(),
            ...args.data
        }
        db.COMMENTS.push(newComment)
        pubsub.publish(`comment-${args.data.post}`, {
            comments: {mutation: 'CREATED', data: newComment}
        })
        return newComment
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.COMMENTS.findIndex((comment) => comment.id === args.id)
        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const [deletedComment] = db.COMMENTS.splice(commentIndex, 1)
        pubsub.publish(`comment-${deletedComment.post}`, {
            comments: {mutation: 'DELETED', data: deletedComment}
        })
        return deletedComment
    },
    updateComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.COMMENTS.findIndex((comment) => comment.id === args.id)
        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        db.COMMENTS[commentIndex] = Object.assign(db.COMMENTS[commentIndex], args.data)
    
        pubsub.publish(`comment-${db.COMMENTS[commentIndex].post}`, {
            comments: {mutation: 'UPDATED', data: db.COMMENTS[commentIndex]}
        })
        return db.COMMENTS[commentIndex]        
    }
}

export { Mutation as default }