<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>VIEW TASK</h1>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">Title: {{ task.title }}</p>
              <p class="subtitle is-6">
                <b>Assigned To:</b> {{ task.assignedTo }}
              </p>
              <p class="subtitle is-6">
                <b>Created By:</b> {{ task.createdBy }}
              </p>
            </div>
          </div>
          <div class="content">
            <p class="subtitle is-6">Description: {{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    class="modal-close is-large"
    @click="closeModal"
    aria-label="close"
  ></button>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { useStore } from '@/store';
import { TaskItem } from '@/store/state';
import { MutationType } from '@/store/mutations';

/**
 * ??Why it is not `export default defineComponent`, just like `TaskListItem.vue`
 * Implementation-wise defineComponent does nothing but return the object passed to it.
 * However, in terms of typing, the returned value
 * has a synthetic type of a constructor for manual render function, TSX and IDE tooling support.
 */
export default {
  name: 'EditModal',
  props: {
    id: { type: Number, required: true }
  },
  setup(props: any) {
    const store = useStore();
    const task = computed(() => store.getters.getTaskById(Number(props.id)));

    const closeModal = () => {
      store.commit(MutationType.SetTaskModal, {
        showModal: false,
        taskId: undefined
      });
    };

    return { closeModal, task };
  }
};
</script>
