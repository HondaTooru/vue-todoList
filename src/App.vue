<template>
  <div id="app">
    <div class="img">
    <img src="./assets/logo.png">
  </div>
   <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from '@/components/todoList'
export default {
  name: 'App',
  components: {'todo-list': TodoList},
  data () {
    return {
      msg: 'fail tail'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#app .img {
  text-align: center;
}
body{
  background-color:#f5f5f5
}
</style>
