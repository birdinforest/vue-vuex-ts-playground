<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createTask">
        <div class="field">
          <label class="label">Task Title</label>
          <div class="control">
            <input
              v-model="title"
              class="input"
              type="text"
              placeholder="Enter task"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              v-model="description"
              class="textarea"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Created By</label>
          <div class="control">
            <input
              v-model="createdBy"
              class="input"
              type="text"
              placeholder="Enter creator's name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Assigned To</label>
          <div class="control">
            <input
              v-model="assignedTo"
              class="input"
              type="text"
              placeholder="Enter assigner's name"
            />
          </div>
        </div>
        <div class="filed is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useStore } from '@/store';
import { TaskItem } from '@/store/state';
import { MutationType } from '@/store/mutations';

export default defineComponent({
  setup() {
    const state = reactive({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: ''
    });

    const store = useStore();

    const createTask = () => {
      if (
        state.title === '' ||
        state.description === '' ||
        state.createdBy === '' ||
        state.assignedTo === ''
      )
        return;

      const task: TaskItem = {
        id: Date.now(),
        title: state.title,
        description: state.description,
        createdBy: state.createdBy,
        assignedTo: state.assignedTo,
        completed: false,
        editing: false
      };

      store.commit(MutationType.CreateTask, task);
    };

    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false);
    };

    /**
     * Note about `reactive`, `refs`, and `toRefs`
     * We could create a variable as we normally do inside a setup function and add it to the returned object,
     * then render it in the template. This will work but there will be no reactivity.
     * Also we could use `refs` but then, it is used on primitives (strings, numbers, booleans).
     * When using `reactive`, we need to use `toRefs` to convert the reactive object to a plain object,
     * where each property on the resulting object is a ref pointing to the corresponding property in the original object.
     */
    return { closeModal, ...toRefs(state), createTask };
  }
});
</script>
