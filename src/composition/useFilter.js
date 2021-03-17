import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from "vue"

const valiHash = ["all", "active", "completed"]
//通过哈希进行筛选
export function useFilter(todosRef) {
    const showRef = ref("all");
    const handle = function () {
        const hash = location.hash.replace(/#\/?/, "");
        if (!valiHash.includes(hash)) {
            location.hash = "#/all";
            showRef.value = "all";
        } else {
            showRef.value = hash;
        }
    }
    //过滤后的列表
    const filterDataList = computed(() => {
        return getFilterDataList(todosRef, showRef.value)
    })
    //只过滤未完成的列表 
    const remainingList = computed(() => {
        return getFilterDataList(todosRef, "active")
    })

    const completedList = computed(() => {
        return getFilterDataList(todosRef, "completed")
    })

    onMounted(() => {
        window.addEventListener("hashchange", handle)
    })
    onUnmounted(() => {
        window.removeEventListener("hashchange", handle)
    })

    return {
        showRef,
        filterDataList,
        remainingList,
        completedList
    }
}

//通过哈希和所有列表  得到当前哈希对应列表
function getFilterDataList(todosRef, showRef) {
    if (showRef === "all") {
        return todosRef.value
    } else if (showRef === "active") {
        return todosRef.value.filter(i => !i.completed)
    } else if (showRef === "completed") {
        return todosRef.value.filter(i => i.completed)
    }
}