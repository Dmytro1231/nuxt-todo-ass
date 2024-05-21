import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TODOS_ENDPOINT } from '../utils/api';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]);

  const fetchTodos = async (userId: number) => {
    const response = await fetch(`${TODOS_ENDPOINT}?userId=${userId}`);
    todos.value = await response.json();
  };

  return {
    todos,
    fetchTodos
  };
});
