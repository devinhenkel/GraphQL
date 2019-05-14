import getUserId, {getUserRoles, getUserAdmin} from '../utils/getuserid'

const User = {
   email: {
       fragment: `fragment userId on User { id }`,
       async resolve(parent, args, {prisma, request}, info){
            const userId = await getUserId(request, false)
            
            if (parent.id === userId) {
                return parent.email
            }
            if (userId){
                const isAdmin = await getUserAdmin(prisma, userId)
                if (isAdmin) {
                    return parent.email
                }  
            }
            return null
        }
   },
   fullname:parent => `${parent.firstname} ${parent.lastname}`
}

export { User as default }