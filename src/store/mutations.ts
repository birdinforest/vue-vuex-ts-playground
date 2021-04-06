import { MutationTree } from 'vuex';
import { State, TaskItem } from './state';

export enum MutationType {
  CreateTask = 'CREATE_TASK',
  SetTasks = 'SET_TASKS',
  CompleteTask = 'COMPLETE_TASK',
  RemoveTask = 'REMOVE_TASK',
  EditTask = 'EDIT_TASK',
  UpdateTask = 'UPDATE_TASK',
  SetLoading = 'SET_LOADING',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  SetTaskModal = 'SET_TASK_MODAL'
}

export type Mutations = {
  [MutationType.CreateTask](state: State, task: TaskItem): void;
  [MutationType.SetTasks](state: State, tasks: TaskItem[]): void;

  [MutationType.CompleteTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [MutationType.RemoveTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [MutationType.EditTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [MutationType.UpdateTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;

  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetCreateModal](state: State, value: boolean): void;
  [MutationType.SetEditModal](
    state: State,
    value: { showModal: boolean; taskId: number | undefined }
  ): void;
  [MutationType.SetTaskModal](
    state: State,
    value: { showModal: boolean; taskId: number | undefined }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreateTask](state, task) {
    state.tasks.unshift(task);
  },
  [MutationType.SetTasks](state: State, tasks: TaskItem[]) {
    state.tasks = tasks;
  },
  // ??
  [MutationType.CompleteTask](state, task) {
    const taskIndex = state.tasks.findIndex(element => element.id === task.id);
    if (taskIndex === -1) return;
    state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...task };
  },
  [MutationType.RemoveTask](state, task) {
    const taskIndex = state.tasks.findIndex(element => element.id === task.id);
    if (taskIndex === -1) return;
    // If task exist in the state, remove it
    state.tasks.splice(taskIndex, 1);
  },
  [MutationType.EditTask](state, task) {
    const taskIndex = state.tasks.findIndex(element => element.id === task.id);
    if (taskIndex === -1) return;
    // If task exist in the state, toggle the editing property
    state.tasks[taskIndex] = {
      ...state.tasks[taskIndex],
      editing: !state.tasks[taskIndex].editing
    };
  },
  [MutationType.UpdateTask](state, task) {
    state.tasks = state.tasks.map(item => {
      if (item.id === task.id) {
        return { ...item, ...task };
      }
      return item;
    });
  },
  [MutationType.SetLoading](state, value) {
    state.loading = value;
    console.log('In loading ...');
  },
  [MutationType.SetCreateModal](state, value) {
    state.showCreateModal = value;
  },
  [MutationType.SetEditModal](state, value) {
    state.showEditModal = value.showModal;
    state.editModalTaskId = value.taskId;
  },
  [MutationType.SetTaskModal](state, { showModal, taskId }) {
    state.showTaskModal = showModal;
    state.showTaskId = taskId;
  }
};
