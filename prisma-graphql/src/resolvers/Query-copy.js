const Query = {
    me() {
        return db.PEOPLE.find((person)=> person.id === "444")
    },
    // passed props (parent, args, context[state], info)
    post: (parent, args, { db }, info) => {
        return db.POSTS.find((post)=> post.id === args.id)
    },
    posts: (parent, args, { db, prisma }, info) => {
        return prisma.query.posts(null, info)

        /* let filteredPosts = ''
        if (!args.query) {
            filteredPosts = db.POSTS
        } else {
            filteredPosts = db.POSTS.filter((post) => {
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
            
        }) */
    },
    people: (parent, args, { db, prisma }, info) => {
        return prisma.query.users(null, info)
        /* if (!args.query) {
            return db.PEOPLE
        } 
        
        return db.PEOPLE.filter((person) => {
            return person.lastname.toLowerCase().includes(args.query.toLowerCase()) || 
            person.firstname.toLowerCase().includes(args.query.toLowerCase()) || 
            person.email.toLowerCase().includes(args.query.toLowerCase())

        }) */
        
    },
    person: (parent, args, { db }, info) => {
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