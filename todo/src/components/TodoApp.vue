<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Todo App</h1>
      <b-field message="Type title, then hit enter">
        <b-input
          v-model="newTodoText"
          @keyup.native.enter="addTodo()"
          placeholder="Todo content"
        >
        </b-input>
        <p class="control">
          <b-button @click="addTodo()" type="is-primary" label="Add" />
        </p>
      </b-field>
      <b-field>
        <b-switch v-model="shouldShowCompletedTodos">
          Show {{ completedTodosCount }} completed todos
        </b-switch>
      </b-field>
      <todo-item
        v-for="todo of todosToDisplay"
        :key="todo.id"
        :todo="todo"
        @save="(newTitle) => editTodo(todo.id, newTitle)"
        @complete="completeTodo(todo.id, !todo.isCompleted)"
        @delete="deleteTodo(todo.id)"
      ></todo-item>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem";
import { escapeXss, Todo } from "./utils";

export default {
  name: "TodoApp",
  components: { TodoItem },
  methods: {
    saveTodos() {
      window.localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    loadSavedTodos() {
      const maybeTodos = window.localStorage.getItem("todos");
      // TODO this returns Object instead of Todo
      return maybeTodos ? JSON.parse(maybeTodos) : [];
    },
    addTodo() {
      // Don't allow blank lines
      if (this.newTodoText === "") {
        return;
      }
      this.todos.push(new Todo(this.newTodoText));
      this.newTodoText = "";
      this.saveTodos();
    },
    editTodo(id, newTitle) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.title = newTitle;
      this.saveTodos();
    },
    completeTodo(id, value) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isCompleted = value;
      this.saveTodos();
    },
    deleteTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      const title = this.todos[index].title;
      this.todos.splice(index, 1);
      this.saveTodos();
      this.$buefy.snackbar.open({
        message: `Deleted <em>${escapeXss(title)}</em>`,
      });
    },
  },
  data() {
    return {
      newTodoText: "",
      todos: this.loadSavedTodos(),
      shouldShowCompletedTodos: true,
    };
  },
  computed: {
    todosToDisplay() {
      return this.todos
        .map((a) => a)
        .sort((a, b) => b.id - a.id)
        .filter((a) => this.shouldShowCompletedTodos || !a.isCompleted);
    },
    completedTodosCount() {
      return this.todos.filter((a) => a.isCompleted).length;
    },
  },
};
</script>
