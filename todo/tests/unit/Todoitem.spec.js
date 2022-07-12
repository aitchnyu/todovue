import { createLocalVue, shallowMount } from "@vue/test-utils";
import Buefy from "buefy";
import { Todo } from "@/components/utils";
import TodoItem from "@/components/TodoItem.vue";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("TodoItem.vue", () => {
  it("can render text", () => {
    const wrapper = shallowMount(TodoItem, {
      localVue,
      propsData: { todo: new Todo("My Title") },
    });
    expect(wrapper.text()).toMatch("My Title");
  });

  it("can enter and cancel edit mode", async () => {
    const wrapper = shallowMount(TodoItem, {
      localVue,
      propsData: { todo: new Todo("My Title") },
    });
    wrapper.vm.startEdit();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.editedTitle).toMatch("My Title");
    expect(wrapper.find(".save-button").text()).toMatch("Save");
    expect(wrapper.find(".cancel-button").text()).toMatch("Cancel");
    wrapper.vm.cancelEdit();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.editedTitle).toBeNull();
    expect(wrapper.find(".save-button").exists()).toBeFalsy();
    expect(wrapper.find(".cancel-button").exists()).toBeFalsy();
  });

  it("emits save with new title when save", async () => {
    const wrapper = shallowMount(TodoItem, {
      localVue,
      propsData: { todo: new Todo("My Title") },
    });
    wrapper.vm.editedTitle = "New title";
    wrapper.vm.saveEdit();
    expect(wrapper.emitted().save[0]).toEqual(["New title"]);
    expect(wrapper.vm.editedTitle).toBeNull();
  });

  it("emits complete when complete called", async () => {
    const wrapper = shallowMount(TodoItem, {
      localVue,
      propsData: { todo: new Todo("My Title") },
    });
    wrapper.vm.complete();
    expect(wrapper.emitted().complete.length).toEqual(1);
  });

  it("emits delete when deleteTodo called", async () => {
    const wrapper = shallowMount(TodoItem, {
      localVue,
      propsData: { todo: new Todo("My Title") },
    });
    wrapper.vm.deleteTodo();
    expect(wrapper.emitted().delete.length).toEqual(1);
  });
});
