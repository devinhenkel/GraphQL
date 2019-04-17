import uuid from 'uuid/v4'

const Mutation = {
    createPerson(parent, args, { db }, info) {
        const emailTaken = db.PEOPLE.some((person) => person.email === args.data.email)
        if (emailTaken) {
            throw new Error('Email taken.')
        }
        
        const newUser = {
            id: uuid(),
            ...args.data
        }
        db.PEOPLE.push(newUser) 
        return newUser
        
    },
    deletePerson(parent, args, { db }, info) {
        const personIndex = db.PEOPLE.findIndex((person) => person.id === args.id)
        if (personIndex === -1) {
            throw new Error('User not found')
        }

        const deletedPerson = db.PEOPLE.splice(personIndex, 1)

        db.POSTS = db.POSTS.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.COMMENTS = db.COMMENTS.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
        db.COMMENTS = db.COMMENTS.filter((comment) => comment.author !== args.id)

        return deletedPerson[0]
    },
    updatePerson(parent, args, { db }, info) {
        const personIndex = db.PEOPLE.findIndex((person) => person.id === args.id)
        if (personIndex === -1) {
            throw new Error('User not found')
        }

        if (typeof args.data.email === 'string') {
            const emailTaken = db.PEOPLE.some((person) => person.email === args.data.email)
            if(emailTaken) {
                throw new Error('Email taken')
            }
        }

        db.PEOPLE[personIndex] = Object.assign(db.PEOPLE[personIndex], args.data)

        return db.PEOPLE[personIndex]
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