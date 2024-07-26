const prisma = require('../db');

const getTodoById = async (todoId) => {
    return await prisma.todo.findUnique({
        where: {
            id: todoId
        }
    })
}

const addTodo = async (title, todo, userId) => {
    return await prisma.todo.create({
        data: {
            title: title,
            todo: todo,
            userId: userId
        }
    })
}

const editTodo = async (todoId, title, todo) => {
    return await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            title: title,
            todo: todo
        }
    })
}

const deleteTodoById = async (todoId) => {
    return await prisma.todo.delete({
        where: {
            id: todoId
        }
    })
}

const findUserWithTodos = async (todoId) => {
    return await prisma.user.findUnique({
        where: {
            id: todoId
        },
        include: {
            todo: true
        }
    })
}


module.exports = {
    addTodo,
    deleteTodoById,
    getTodoById,
    editTodo,
    findUserWithTodos
}