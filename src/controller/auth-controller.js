const express = require('express');
const { registerNewUser, loginUser } = require('../services/auth-service');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('auth akuh')
})

router.post('/register', async (req, res) => {
    const bodyRequest = req.body;
    try {
        const createUser = await registerNewUser(bodyRequest.email, bodyRequest.username, bodyRequest.password);
        const { password: _, ...userWithoutPassword } = createUser;

        res.status(201).json({
            status: 201,
            message: 'Successfully create user',
            data: userWithoutPassword
        })
    } catch (error) {
        if (error.code === 'P2002') {
            res.status(401).json({
                status: 401,
                message: 'Email has been registered, try again with another email'
            })
        }
        else {
            res.status(401).json({
                status: 401,
                error: error.message
            })
        }
    }

})

router.post('/login', async (req, res) => {
    const bodyRequest = req.body;
    try {
        const loginResult = await loginUser(bodyRequest.email, bodyRequest.password);
        res.status(201).json({
            message: 'Sucessfully login',
            data: loginResult
        })
    } catch (error) {
        if (error.message === 'Invalid Email') {
            res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else if (error.message === 'Invalid Password') {
            res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            res.status(501).json({
                status: 501,
                message: "Internal server error"
            })
        }
    }
})

module.exports = router;
