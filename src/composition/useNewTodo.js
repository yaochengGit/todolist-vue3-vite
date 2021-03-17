import {
    ref
} from "vue"

//新增数据
export function useNewTodo(todosRef) {
    const newTodoRef = ref(""); //新增任务  先变为响应式数据
    //添加新任务
    const addTodo = () => {
        const value = newTodoRef.value;
        if(!value) {
            alert("请输入标题！")
            return
        }
        //生成一个任务对象
        const todo = {
            title: value,
            completed: false,
            id: new Date().getTime(),
        }

        todosRef.value.push(todo);
        newTodoRef.value = "";
    }
    return {
        newTodoRef,
        addTodo,
    }
}