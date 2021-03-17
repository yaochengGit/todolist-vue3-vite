import {
    ref,
    watchEffect
} from "vue";
import todoStorage from "../utils/todoStorage";


//获取，保存列表到localstorage
export function useTodoList() {
    //监听列表
    const todosRef = ref(todoStorage.fetch());
    watchEffect(() => {
        todoStorage.save(todosRef.value)
    })

    return {
        todosRef
    }
}