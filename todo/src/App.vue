<template>
  <div id="app">
    <todo-app />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TodoApp from "./components/TodoApp.vue";

export default {
  name: "App",
  components: {
    TodoApp,
  },
};
</script>
