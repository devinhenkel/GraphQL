const Query = {
    me() {
        return db.PEOPLE.find((person)=> person.id === "444")
    },
    // passed props (parent, args, context[state], info)
    post: (parent, args, { db }, info) => {
        return db.POSTS.find((post)=> post.id === args.id)
    },
    posts: (parent, args, { db, prisma }, info) => {
        const opArgs = {}

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
        return prisma.query.posts(opArgs, info)
    },
    users: (parent, args, { db, prisma }, info) => {
        const opArgs = {}

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
    user: (parent, args, { db }, info) => {
        return db.PEOPLE.find((person)=> person.id === args.id)
    },
    comments(parent, args, { db, prisma }, info) {
        return prisma.query.comments(null, info)
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