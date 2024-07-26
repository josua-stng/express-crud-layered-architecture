const { registerUser, findByEmailUser } = require('../repository/auth-repository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'AYAMGORENG';

// register user
const registerNewUser = async (email, username, password) => {
    if (!email || !username || !password) {
        throw new Error("Missing field register user");
    }
    return await registerUser(email, username, password);
}

// login user
const loginUser = async (email, password) => {
    const existUser = await findByEmailUser(email);
    if (!existUser) {
        throw new Error('Invalid Email');
    };

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
        throw new Error('Invalid Password')
    };

    const token = jwt.sign({
        id: existUser.id,
        username: existUser.username
    }, SECRET_KEY, {
        expiresIn: '1h',
        subject: existUser.id.toString()
    });

    return {
        existUser,
        token,
        id: existUser.id,
        username: existUser.username
    }
}


module.exports = {
    registerNewUser,
    loginUser
};