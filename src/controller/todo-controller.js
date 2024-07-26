const express = require('express');
const { createTodo, deleteTodo, editedTodo, getUserWithTodos } = require('../services/todo-service');
const { verifyToken } = require('../middleware/verify-token');
const router = express.Router();

// get todo user
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const userWithTodos = await getUserWithTodos(userId);
        return res.status(201).json({
            status: 201,
            data: userWithTodos
        })
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            return res.status(501).json({
                status: 501,
                message: 'Internal server error'
            })
        }
    }
})

// post todo
router.post('/', verifyToken, async (req, res) => {
    const bodyRequest = req.body;
    try {
        const newTodo = await createTodo(bodyRequest.title, bodyRequest.todo, req.userId)
        res.status(201).json({
            message: 'Sucessfully created todo',
            data: newTodo
        })
    } catch (error) {
        if (error.message === 'Missing field') {
            return res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            return res.status(501).json({
                status: 501,
                message: 'Internal server error'
            })
        }
    }
})

// put todo
router.put('/:id', verifyToken, async (req, res) => {
    const todoId = req.params.id;
    const bodyRequest = req.body;
    try {
        if (!(bodyRequest.title && bodyRequest.todo)) {
            return res.status(401).json({
                status: 401,
                message: 'Some field are missing'
            })
        }
        const todoEdit = await editedTodo(todoId, bodyRequest.title, bodyRequest.todo);
        return res.status(201).json({
            status: 201,
            message: todoEdit
        })
    } catch (error) {
        if (error.message === 'Id Not found') {
            return res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            return res.status(501).json({
                status: 501,
                message: 'Internal server error'
            })
        }
    }
})

// patch todo
router.patch('/:id', verifyToken, async (req, res) => {
    const todoId = req.params.id;
    const bodyRequest = req.body;
    try {
        const todoEdit = await editedTodo(todoId, bodyRequest.title, bodyRequest.todo);
        return res.status(201).json({
            status: 201,
            message: todoEdit
        })
    } catch (error) {
        if (error.message === 'Id Not found') {
            return res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            return res.status(501).json({
                status: 501,
                message: 'Internal server error'
            })
        }
    }
})

// delete todo
router.delete('/:id', verifyToken, async (req, res) => {
    const todoId = req.params.id;
    try {
        const todoDelete = await deleteTodo(todoId);
        res.status(201).json({
            status: 201,
            message: 'Successfuly delete todo',
            data: todoDelete
        })
    } catch (error) {
        if (error.message === 'Id not found') {
            res.status(401).json({
                status: 401,
                message: error.message
            })
        }
        else {
            res.status(501).json({
                status: 501,
                message: error.message
            })
        }
    }
})

module.exports = router;