<template>
  <div>
    <b-field v-if="editedTitle === null">
      <b-checkbox :value="todo.isCompleted" @input="complete()">
        <span
          :style="{
            'text-decoration': todo.isCompleted ? 'line-through' : null,
          }"
          >{{ todo.title }}</span
        >
        <b-button
          @click="startEdit()"
          type="is-primary"
          size="is-small"
          label="Edit"
        />
        <b-button
          @click="deleteTodo()"
          type="is-danger"
          size="is-small"
          label="Delete"
        />
      </b-checkbox>
    </b-field>
    <b-field v-else :grouped="true" message="Type new title, then hit enter">
      <b-input
        v-model="editedTitle"
        @keyup.native.enter="saveEdit()"
        placeholder="Todo content"
      >
      </b-input>
      <p class="control">
        <b-button @click="saveEdit()" class="save-button" type="is-primary"
          >Save</b-button
        >
      </p>
      <p class="control">
        <b-button @click="cancelEdit()" class="cancel-button" type="is-primary"
          >Cancel</b-button
        >
      </p>
    </b-field>
  </div>
</template>

<script>
import { Todo } from "./utils";

export default {
  name: "TodoItem",
  props: {
    todo: { type: Todo, required: true },
  },
  data() {
    return {
      editedTitle: null,
    };
  },
  methods: {
    startEdit() {
      this.editedTitle = this.todo.title;
    },
    cancelEdit() {
      this.editedTitle = null;
    },
    saveEdit() {
      this.$emit("save", this.editedTitle);
      this.editedTitle = null;
    },
    complete() {
      this.$emit("complete");
    },
    deleteTodo() {
      this.$emit("delete");
    },
  },
};
</script>
