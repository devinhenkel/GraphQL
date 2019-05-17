import jwt from 'jsonwebtoken'

const getUserToken = (userId) => {
    return jwt.sign({ userId: userId}, 'mysecretkey', { expiresIn: '7d' })
}

export { getUserToken as default }