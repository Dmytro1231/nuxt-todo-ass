import { defineStore } from 'pinia';
import { ref } from 'vue';
import { USERS_ENDPOINT } from '../utils/api';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const useUserStore = defineStore('user', () => {
  const users = ref([]);
  const currentPage = ref(1);
  const searchQuery = ref('');

  const fetchUsers = async (page = 1) => {
    const response = await fetch(USERS_ENDPOINT);
    const data = await response.json();
    users.value = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    currentPage.value = page;
  };

  return {
    users,
    currentPage,
    searchQuery,
    fetchUsers
  };
});
