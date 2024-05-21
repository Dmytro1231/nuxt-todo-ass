<template>
    <div class="user-table">
      <input v-model="search" @input="filterUsers" placeholder="Search by name" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" @click="goToTodos(user.id)">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="userStore.currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="filteredUsers.length < 5">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useUserStore } from '@/store/user';
  import { useRouter, useRoute } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  
  const search = ref('');
  
  const filteredUsers = computed(() => {
    return userStore.users.filter(user => user.name.toLowerCase().includes(search.value.toLowerCase()));
  });
  
  const goToTodos = (userId: number) => {
    router.push(`/todos?userId=${userId}`);
  };
  
  const prevPage = () => {
    if (userStore.currentPage > 1) {
      userStore.fetchUsers(userStore.currentPage - 1);
    }
  };
  
  const nextPage = () => {
    userStore.fetchUsers(userStore.currentPage + 1);
  };
  
  const filterUsers = () => {
    userStore.searchQuery = search.value;
  };
  
  onMounted(() => {
    const savedPage = localStorage.getItem('currentPage');
    const page = savedPage ? parseInt(savedPage, 10) : userStore.currentPage;
    userStore.fetchUsers(page);
  });
  
  watch(() => userStore.currentPage, (newPage) => {
    localStorage.setItem('currentPage', newPage.toString());
  });
  </script>
  
  <style lang="scss">
  @import '@/assets/styles/variables.scss';

 .user-table {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: $white-color;
  border-radius: 8px;
  box-shadow: $box-shadow;

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid $third-color;
    border-radius: 4px;
    font-size: $font-size-base;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid $third-color;
      font-size: $font-size-base;
    }

    tr {
      &:hover {
        background-color: $background-secondary-color;
        cursor: pointer;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: $primary-color;
      color: $white-color;
      cursor: pointer;
      font-size: $font-size-base;

      &:disabled {
        background-color: $gray-color;
      }

      &:not(:disabled):hover {
        background-color: $primary-hover-color;
      }
    }
  }
}

  </style>
  