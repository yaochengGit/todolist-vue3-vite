import {
    computed,
    ref
} from "vue"

export function useEdit(todosRef) {
    const editTodoRef = ref(null);
    let titleCache = null;
    //编辑
    const editTodo = (todo) => {
        editTodoRef.value = todo;
        titleCache = todo.title;
    }

    //完成修改
    const doneEdit = (todo) => {
        editTodoRef.value = null;
    }

    //取消修改
    const cancleEdit = (todo) => {
        editTodoRef.value = null;
        todo.title = titleCache;
    }

    //全部完成
    const setAllCompleted = computed({
        get() {
            return todosRef.value.filter(i => !i.completed).length === 0;
        },
        set(checked) {
            todosRef.value.forEach(element => {
                element.completed = checked;
            });
        }
    })

    return {
        editTodoRef,
        editTodo,
        doneEdit,
        cancleEdit,
        setAllCompleted,
    }
}