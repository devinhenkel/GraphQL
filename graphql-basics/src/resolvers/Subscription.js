const Subscription = {
    comments: {
        subscribe(parent, args, { db, pubsub }, info) {
            const postExists = db.POSTS.find((post) => post.id === args.postId && post.published)
            if (!postExists) {
                throw new Error('Post does not exist or is not published')
            }

            return pubsub.asyncIterator(`comment-${args.postId}`)
        }
    },
    posts: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator(`posts`)
        }
    }
}

export { Subscription as default }