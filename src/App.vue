<template>
    <div id="app">
        <section class="todoapp">
            <header class="header">
                <h1>Todo-List</h1>
                <input class="new-todo"
                       autofocus=""
                       autocomplete="off"
                       placeholder="What needs to be done?"
                       v-model="newTodoRef"
                       @keyup.enter="addTodo" />
            </header>
            <section class="main" v-show="todosRef.length!==0">
                <input id="toggle-all"
                       class="toggle-all"
                       type="checkbox"
                       v-model="setAllCompleted" />
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    <li class="todo"
                        v-for="(item) in filterDataList"
                        :key="item.id"
                        :class="{completed:item.completed,editing:item === editTodoRef}">
                        <div class="view">
                            <input class="toggle"
                                   type="checkbox"
                                   v-model="item.completed" />
                            <label @dblclick="editTodo(item)">{{item.title}}</label>
                            <button class="destroy"
                                    @click="deleteTodo(item)"></button>
                        </div>
                        <input class="edit"
                               type="text"
                               v-model="item.title"
                               @blur="doneEdit"
                               @keyup.esc="cancleEdit(item)" />
                    </li>
                </ul>
            </section>
            <footer class="footer"
                    v-show="todosRef.length!==0">
                <span class="todo-count">
                    <strong>{{remainingList.length}}</strong>
                    <span>items left</span>
                </span>
                <ul class="filters">
                    <li><a href="#/all"
                           :class="{selected:showRef==='all'}">All</a></li>
                    <li><a href="#/active"
                           :class="{selected:showRef==='active'}">Active</a></li>
                    <li><a href="#/completed"
                           :class="{selected:showRef==='completed'}">Completed</a></li>
                </ul>
                <button class="clear-completed"
                        v-show="completedList.length!==0"
                        @click="deleteAllTodo">
                    Clear completed
                </button>
            </footer>
        </section>
    </div>
</template>

<script>
import { useTodoList } from "./composition/useTodoList";
import { useNewTodo } from "./composition/useNewTodo";
import { useFilter } from "./composition/useFilter";
import { useEdit } from "./composition/useEdit";
import { useDelete } from "./composition/useDelete";
export default {
    setup() {
        //获取到响应式列表数据
        const { todosRef } = useTodoList();
        return {
            todosRef,
            ...useNewTodo(todosRef),
            ...useFilter(todosRef),
            ...useEdit(todosRef),
            ...useDelete(todosRef),
        };
    },
};
</script>

<style>
</style>