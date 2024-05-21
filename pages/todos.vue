<template>
  <div class="todo-page">
    <h1>{{ userName }}</h1>
    <button @click="goBack">Back to Users</button>
    <TodoList :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { useTodoStore } from '@/store/todo';
import { useRouter, useRoute } from 'vue-router';
import TodoList from '@/components/TodoList.vue';

const userStore = useUserStore();
const todoStore = useTodoStore();
const router = useRouter();
const route = useRoute();

const userName = ref('');
const todos = ref([]);

const goBack = () => {
  router.push('/');
};

const fetchUserData = async (userId: string | string[]) => {
  await todoStore.fetchTodos(Number(userId));
  const user = userStore.users.find(u => u.id == Number(userId));
  userName.value = user ? user.name : '';
  todos.value = todoStore.todos;
};

watch(route, async () => {
  const userId = route.query.userId;
  if (userId) {
    await fetchUserData(userId);
  }
});

onMounted(async () => {
  const userId = route.query.userId;
  if (userId) {
    await fetchUserData(userId);
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.todo-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: $white-color;
  border-radius: 8px;
  box-shadow: $box-shadow;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
    font-size: $font-size-large;
  }

  button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: $primary-color;
    color: $white-color;
    cursor: pointer;
    font-size: $font-size-base;

    &:hover {
      background-color: $primary-hover-color;
    }
  }
}
</style>
