import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoState, Task } from '../types';

const initialState: TodoState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    initializeTasks: (state) => {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        state.tasks = JSON.parse(tasks);
      }
    },
  },
});

export const { addTask, removeTask, toggleTask, setImportant, initializeTasks } = todoSlice.actions;
export default todoSlice.reducer;