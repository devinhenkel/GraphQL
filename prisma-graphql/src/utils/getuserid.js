import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    const authHeader = request.request ? request.request.headers.authorization : request.connection.context.Authorization

    if (authHeader) {
        const authToken = authHeader.replace('Bearer ', '')
        const verified = jwt.verify(authToken, 'mysecretkey')
        return verified.userId
    }

    if(requireAuth) {
        throw new Error('Authentication required.')
    }

    return null
    
}

const getUserRoles = async (request, prisma, requireAuth = true) => {
    const userId = getUserId(request, requireAuth)

    let opArgs = {}
    opArgs.where = {id: userId}
    const currentUser = await prisma.query.user(opArgs, '{username, roles}')
    //console.log(JSON.stringify(currentUser, null, 2))
    return currentUser.roles
}

const getUserAdmin = async (prisma, userId) => {
    let opArgs = {}
    opArgs.where = {id: userId}
    const currentUser = await prisma.query.user(opArgs, '{username, roles}')
    return currentUser.roles.includes('ADMIN')
}

export { getUserId as default, getUserRoles, getUserAdmin }