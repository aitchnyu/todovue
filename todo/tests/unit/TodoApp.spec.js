import { createLocalVue, shallowMount } from "@vue/test-utils";
import Buefy from "buefy";
import TodoApp from "@/components/TodoApp.vue";
import TodoItem from "@/components/TodoItem.vue";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("TodoItem.vue", () => {
  it("can add a todo", async () => {
    const saveTodosMock = jest
      .spyOn(TodoApp.methods, "saveTodos")
      .mockImplementation(() => {});
    const loadSavedTodosMock = jest
      .spyOn(TodoApp.methods, "loadSavedTodos")
      .mockImplementation(() => []);
    const wrapper = shallowMount(TodoApp, {
      localVue,
    });
    expect(loadSavedTodosMock).toBeCalled();
    wrapper.vm.newTodoText = "New title";
    wrapper.vm.addTodo();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(TodoItem).vm.todo.title).toMatch("New title");
    expect(wrapper.vm.newTodoText).toEqual("");
    expect(wrapper.vm.todos.length).toEqual(1);
    expect(saveTodosMock).toBeCalled();
  });
  // TODO tests for localstorage, edit, delete, complete and filtering
});
