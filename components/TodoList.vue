<template>
  <ul class="todo-list">
    <li class="todo-list__item" v-for="todo in todos" :key="todo.id">
      {{ todo.title }} - <span :class="{'todo-list__status--completed': todo.completed, 'todo-list__status--not-completed': !todo.completed}">{{ todo.completed ? 'Completed' : 'Not Completed' }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const props = defineProps<{
  todos: Todo[];
}>();
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.todo-list {
  list-style: none;
  padding: 0;

  &__item {
    padding: 0.75rem 0;
    border-bottom: 1px solid #ddd;

    &__status {
      &--completed {
        text-decoration: line-through;
        color: $secondary-color;
      }
      &--not-completed {
        color: $primary-color;
      }
    }
  }
}
</style>
