<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
    crossorigin="anonymous"
  />
  <th>{{ id }}</th>
  <td>
    <input type="checkbox" :checked="completed" @change="toggleCompletion()" />
  </td>
  <td>{{ title }} <strong>(C)</strong></td>
  <td>{{ createdBy }}</td>
  <td>{{ assignedTo }}</td>
  <td>
    <span class="icon" @click="viewTask()">
      <i class="fa fa-eye"></i>
    </span>
    <span class="icon" @click="editTask()">
      <i class="fa fa-edit"></i>
    </span>
    <span class="icon" @click="removeTask()">
      <i class="fa fa-trash"></i>
    </span>
  </td>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { MutationType } from '@/store/mutations';

export default defineComponent({
  name: 'TaskListItem',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    assignedTo: { type: String, required: true },
    completed: { type: Boolean, required: true },

    // FIXME: Doesn't update during editing. Reference to `completed`.
    editing: { type: Boolean, required: true }
  },

  setup(props) {
    const store = useStore();

    const toggleCompletion = () => {
      store.commit(MutationType.CompleteTask, {
        id: props.id,
        completed: !props.completed
      });
    };

    const removeTask = () => {
      store.commit(MutationType.RemoveTask, {
        id: props.id
      });
    };

    const viewTask = () => {
      store.commit(MutationType.SetTaskModal, {
        showModal: true,
        taskId: props.id
      });
    };

    const editTask = () => {
      store.commit(MutationType.SetEditModal, {
        showModal: true,
        taskId: props.id
      });
    };

    return { toggleCompletion, removeTask, editTask, viewTask };
  }
});
</script>
