const Comment = {
    author(parent, args, { db }, info) {
        return db.PEOPLE.find((person) => {
            return parent.author === person.id;
        })
    },
    post(parent, args, { db }, info) {
        return db.POSTS.find((post) => {
            return parent.post === post.id;
        })
    }
}

export { Comment as default }