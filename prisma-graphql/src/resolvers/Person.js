const Person = {
    // resolver for posts in Person object
    posts(parent, args, { db }, info) {
        return db.POSTS.filter((post) => {
            return parent.id === post.author;
        })
    },
    comments(parent, args, { db }, info) {
        return db.COMMENTS.filter((comment) => {
            return parent.id === comment.author;
        })
    }
}

export { Person as default }