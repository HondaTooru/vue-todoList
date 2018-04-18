<template>
  <div class="todoapp">
    <header>
      <input type="checkbox"  v-if="TodoList.length" v-model="allDone">
      <input placeholder="what needs to be done?" name="newTodo" type="text" @keyup.enter="addTodo" v-model="newTodo">
    </header>
    <section class="main">
      <ul class="todo-list">
        <li :class="{completed: todo.isFinished, edited: todo === editedTodo}" v-for="todo in filterTodoList" :key="todo.id">
           <div class="view">
             <input type="checkbox" v-model="todo.isFinished">
             <label @dblclick="editTodo(todo)">{{todo.item}}</label>
             <button @click="removeTodo(todo)"></button>
           </div>
           <input type="text" class="edit"
           v-model="todo.item"
           v-todo-foucs="todo == editedTodo"
           @blur="doneTodo(todo)"
           @keyup.enter="doneTodo(todo)"
           @keyup.esc="cancelTodo(todo)"
           >
        </li>
      </ul>
    </section>
    <footer v-if='TodoList.length'>
      <span class="todo-count">{{remainin}} item left</span>
      <ul>
        <li :class="{selected: visibility == 'All'}" @click="visibility= 'All'">All</li>
        <li :class="{selected: visibility == 'Active'}" @click="visibility= 'Active'">Active</li>
        <li :class="{selected: visibility == 'Completed'}" @click="visibility= 'Completed'">Complete</li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-if="TodoList.length > remainin">Clear Completed</button>
    </footer>
  </div>
</template>
<script>
let filters = {
  All: function (todos) {
    return todos
  },
  Active: function (todos) {
    return todos.filter(todo => !todo.isFinished)
  },
  Completed: function (todos) {
    return todos.filter(todo => todo.isFinished)
  }
}
export default {
  name: 'todoList',
  data () {
    return {
      newTodo: '',
      TodoList: [],
      editedTodo: null,
      visibility: 'All'
    }
  },
  methods: {
    addTodo () {
      let value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.TodoList.unshift({
        item: this.newTodo,
        isFinished: false
      })
      this.newTodo = ''
    },
    removeTodo (todo) {
      this.TodoList.splice(this.TodoList.indexOf(todo), 1)
    },
    removeCompleted () {
      this.TodoList = filters.Active(this.TodoList)
    },
    editTodo (todo) {
      this.beforeTitle = todo.item
      this.editedTodo = todo
    },
    doneTodo (todo) {
      if (this.editedTodo) {
        this.editedTodo = null
        todo.item = todo.item.trim()
        if (!todo.item) {
          this.removeTodo(todo)
        }
      }
      this.editedTodo = null
    },
    cancelTodo (todo) {
      todo.item = this.beforeTitle
      this.editedTodo = null
    }
  },
  computed: {
    filterTodoList: function () {
      return filters[this.visibility](this.TodoList)
    },
    remainin: function () {
      return filters.Active(this.TodoList).length
    },
    allDone: {
      get () {
        return this.remainin === 0
      },
      set (value) {
        this.TodoList.map(function (todo) {
          todo.isFinished = value
        })
      }
    }
  },
  directives: {
    'todo-foucs': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped lang="less">
@BaseColor: #e6e6e6;
@linkColor: #737373;
input,button,div,ul,li,p,header,section,h1,footer{margin: 0;padding: 0;}
li{list-style: none;}
input,button{outline: 0 none;border: none; background:none;appearance:none;}
.todoapp {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  font-smoothing: antialiased;
  font-weight: 300;
  background-color:white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
  header {
    position: relative;
    input[type='checkbox'] {
      position: absolute;
      width: 60px;
      height: 34px;
      text-align: center;
      background: none;
      transform: rotate(90deg);
      top: 16px;
      left: -9px;
      &:checked {
        &:after{
          color:@linkColor
        }
      }
      &:after {
        content: '❯';
        color:@BaseColor;
        padding: 10px 27px;
        font-size: 22px;
      }
    }
    input[name ~= 'newTodo']{
      padding: 16px 16px 16px 60px;
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
      width: 100%;
      box-sizing: border-box;
      background-color:rgba(0, 0, 0, 0.003);
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4;
      color: inherit;
      -webkit-font-smoothing: antialiased;
      &::-webkit-input-placeholder {
        color: @BaseColor
      }
    }
  }
  .main {
    border-top: 1px solid #e6e6e6;
    ul.todo-list {
      li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
        &.completed {
          label {
            color: @BaseColor;
            text-decoration: line-through;
          }
        }
        &.edited {
          .view{display: none;}
          .edit{display: block;}
        }
        &:hover {
          .view {
            button {
                &:after {
                  content: '×';
                  cursor: pointer;
                }
            }
          }
        }
        .view {
          input[type='checkbox'],button {
            position: absolute;
            width: 40px;
            height: 40px;
            margin: auto 0;
            top: 0;
            bottom: 0;
          }
          button {
            right: 10px;
            font-size: 30px;
            color: #af5b5e;
          }
          input[type='checkbox'] {
            &:checked {
              &:after {
                content: url(../assets/btn_checked.svg)
              }
            }
            &:after{
              content: url(../assets/btn.svg)
            }
          }
        }
        label, .edit {
          white-space: pre-line;
          word-break: break-all;
          padding: 15px 60px 15px 15px;
          margin-left: 45px;
          display: block;
          line-height: 1.2;
          transition: color 0.4s;
          font-size: 24px;
          color:#4d4d4d;
        }
        input.edit {
          display: none;
          width: 505px;
          box-sizing: border-box;
          box-shadow: inset 0 0 4px 0px #ababab;
        }
      }
    }
  }
  footer {
    color:#777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid @BaseColor;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                  0 8px 0 -3px #f6f6f6,
                  0 9px 1px -3px rgba(0, 0, 0, 0.2),
                  0 16px 0 -6px #f6f6f6,
                  0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
    span {
      float: left;
      text-align: left;
    }
    ul {
      position: absolute;
      right:0;
      left:0;
      z-index: 99;
      li {
        display: inline;
        border: 1px solid transparent;
        cursor: pointer;
        padding: 3px 7px;
        &.selected {
          border-color: rgba(175,47,47,0.2)
        }
      }
    }
    button {
      float: right;
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;
      position: relative;
      color: #777;
      z-index: 100
    }
  }

}
</style>
