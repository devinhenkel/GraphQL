import { Prisma } from 'prisma-binding'
import { printSchema } from 'graphql';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query
// prisma.mutation
// prisma.subscription 
// prisma.exists

/*prisma.query.users({
    where: {
        id: 'cjum0nsys00t008485pdcgh8t'
    }}, 
    `{ 
        id 
        firstname 
        lastname 
        posts { 
            title 
            body 
        } 
    }`
    )
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    */

/*prisma.mutation.updatePost({
    where: {id: 'cjumqizub000i0861iwkosjo3'}, 
    data: { 
        author: {
            connect: {
                id: 'cjuowkv27009v0864m5gmubua'
            }
        },
        published: true
    }
}, 
    `{
        title 
        body 
        author {
            firstname 
            lastname
        }
    }`
    )
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    */

/* prisma.mutation.createPost({
    data: {
        title: "Knock, knock!",
        body: "Who's there?",
        published: false,
        author: {
            connect: {
                id: 'cjum0nsys00t008485pdcgh8t'
            }
        }
    }
}, `{ id title body }`)
.then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}) */
/* prisma.query.posts(null, '{ id title body author { firstname lastname }}').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}) */

/* let postSelect = {
    id: "cjup0mm4y0059072228m4lbt3"
}

let postUpdate = {
    body: "I mean, I f@$king posted this from Node!",
    published: true
}

let graphSelect = `{
    id
    title
    body
    published
    author {
        firstname
        lastname
    }
}`


prisma.mutation.updatePost({ 
    where: postSelect,
    data: postUpdate
},
graphSelect
).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.users(null, `{
        id
        firstname
        lastname
        posts {
            title
        }
    }`)
}).then((data) => {
    console.log('POSTS:')
    console.log(JSON.stringify(data, undefined, 2))
}) */

// using async await to run command 

const createAuthorID = "cjum0nsys00t008485pdcgh8t"
//const createAuthorID = "xxx"

const createPostInfo = {
    title: "Well I wonder wonder who",
    body: "Bedoop bedoop, who wrote the book of love.",
    published: false
} 

const createPostSelectionInfo = `
{
    author {
        id
        firstname
        lastname
        email
        posts {
            id
            title
            published
        }
    }
}
`
/* const userSelectionInfo = `
{
    id
    firstname
    lastname
    email
    posts {
        id
        title
        published
    }
}
`
*/
const createPostForUser = async (createAuthorID, createPostInfo) => {
    const userExists = await prisma.exists.User({ id: createAuthorID })
    if (!userExists) {
        throw new Error('User not found.')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...createPostInfo,
            author: {
                connect: {
                    id: createAuthorID
                }
            }
        }
    },
    createPostSelectionInfo
    )
    
    return post.author
}

/* createPostForUser(createAuthorID, createPostInfo)
.then((data) => {console.log(JSON.stringify(data, undefined, 2))})
.catch((err) => console.log(err.message))  */

const postID = 'cjumqizub000i0861iwkosjo3'

const postInfo = {
    title: "Sniff it!"
}

const postSelectionInfo = `
{
    id
    author {
        id
        firstname
        lastname
        email
        posts {
            id
            title
            published
        }
    }
}
`
const userSelectionInfo = `
{
    id
    firstname
    lastname
    email
    posts {
        id
        title
        published
    }
}
`

const updatePostForUser = async (postID, postInfo) => {
    const postExists = await prisma.exists.Post({ id: postID })
    if(!postExists) {
        throw new Error('Post not found.')
    }
    const post = await prisma.mutation.updatePost({
        where: {
            id: postID
        },
        data: postInfo

    },
    postSelectionInfo
    )
   
    
    return post.author
}

/* updatePostForUser(postID, postInfo)
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    .catch((err) => console.log(err)) */

/* prisma.exists.User({
    id: 'cjum0nsys00t008485pdcgh8t'
}).then((exists) => {
    console.log(exists)
}) */