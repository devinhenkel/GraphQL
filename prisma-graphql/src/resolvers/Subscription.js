const Subscription = {
    comments: {
        subscribe(parent, { postId }, { prisma }, info) {
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info)
        }
    },
    posts: {
        subscribe(parent, args, { db, pubsub }, info) {
            return prisma.subscription.post(null, info)
        }
    }
}

export { Subscription as default }