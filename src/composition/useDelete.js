export function useDelete(todosRef) {
    const deleteTodo = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    const deleteAllTodo = () => {
        todosRef.value = todosRef.value.filter(i => !i.completed);
    }

    return {
        deleteTodo,
        deleteAllTodo,
    }
}