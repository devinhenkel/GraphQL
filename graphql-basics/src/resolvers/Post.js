const Post = {
    // resolver for author in Post object
    author(parent, args, { db }, info) {
        return db.PEOPLE.find((person) => {
            return parent.author === person.id;
        })
    },
    comments(parent, args, { db }, info) {
        return db.COMMENTS.filter((comment) => {
            return parent.id === comment.post;
        })
    }
}

export { Post as default }