/**
 * 获取目前的所有任务
 */
const LOCAL_KEY = "todomvc"

function fetch() {
    let result = localStorage.getItem(LOCAL_KEY);
    if (result) {
        return JSON.parse(result)
    }
    return []
}

function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

export default {
    fetch,
    save
}