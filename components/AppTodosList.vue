<template>
  <ul>
    <AppTodosItem
      v-for="todo in todos"
      v-bind:key="todo.id"
      :data="todo"
     />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppTodosItem from './AppTodosItem.vue'

@Component({ components: { AppTodosItem }})
export default class extends Vue {
  $store!: Vuex.ExStore
  get todos() {
    return this.$store.state.todos.todos
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}
</style>
