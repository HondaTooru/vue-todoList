import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/todoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: TodoList
    }
  ]
})
