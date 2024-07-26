const { addTodo, deleteTodoById, getTodoById, editTodo, findUserWithTodos } = require('../repository/todo-repository')

const getUserWithTodos = async (todoId) => {
    const user = await findUserWithTodos(todoId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const findTodo = async (todoId) => {
    const getIdTodo = await getTodoById(todoId);
    if (!getIdTodo) {
        throw new Error('Id Not found')
    }
    return getIdTodo
}

const createTodo = async (title, todo, userId) => {
    if (!title || !todo) {
        throw new Error('Missing field')
    }
    return await addTodo(title, todo, userId)
}

const editedTodo = async (todoId, title, todo) => {
    await findTodo(todoId);
    return await editTodo(todoId, title, todo);
}

const deleteTodo = async (todoId) => {
    await findTodo(todoId);
    return await deleteTodoById(todoId);
}


module.exports = {
    createTodo,
    deleteTodo,
    editedTodo,
    getUserWithTodos
}