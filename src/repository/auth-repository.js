const bcrypt = require("bcrypt");
const prisma = require('../db');
const saltRounds = 10
const registerUser = async (email, username, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword
        }
    })
}

const findByEmailUser = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

module.exports = {
    registerUser,
    findByEmailUser
}