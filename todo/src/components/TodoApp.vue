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

class Todo {
  title = "";
  isCompleted = false;
  id = null;

  constructor(title) {
    this.title = title;
    this.id = Date.now(); // This generates monotonically increasing id
  }
}

function escapeXss(untrustedString) {
  // From https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html#rule-6-populate-the-dom-using-safe-javascript-functions-or-properties
  const elem = document.createElement("span");
  elem.textContent = untrustedString;
  return elem.innerHTML;
}

export default {
  name: "TodoApp",
  components: { TodoItem },
  methods: {
    addTodo() {
      // Don't allow blank lines
      if (this.newTodoText === "") {
        return;
      }
      this.todos.push(new Todo(this.newTodoText));
      this.newTodoText = "";
    },
    editTodo(id, newTitle) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.title = newTitle;
    },
    completeTodo(id, value) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isCompleted = value;
    },
    deleteTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      const title = this.todos[index].title;
      this.todos.splice(index, 1);
      this.$buefy.snackbar.open({
        message: `Deleted <em>${escapeXss(title)}</em>`,
      });
    },
  },
  data() {
    return {
      newTodoText: "",
      todos: [],
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
