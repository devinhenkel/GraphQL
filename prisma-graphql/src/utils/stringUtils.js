import bcrypt from 'bcryptjs'

const validatePassword = (password) => {
    const passVal = require('password-validator')
        
    let schema = new passVal()

    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()

    if(!schema.validate(password)) {
        const whyFail = schema.validate(password, {list: true})
        throw new Error('Password does not meet requirements. '+whyFail)
    }

    return true
}

const hashPassword = async (password) => {
    const hashPass = await bcrypt.hash(password, 10)
    return hashPass
}

export { validatePassword, hashPassword }