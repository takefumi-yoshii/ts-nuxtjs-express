<template>
  <div class="container">
    <h3>Todos</h3>
    <div class="description">
      <p>todosCount:{{ todosCount }}</p>
      <p>doneCount:{{ doneCount }}</p>
    </div>
    <hr />
    <AppTodosForm />
    <AppTodosList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppTodosForm from './AppTodosForm.vue'
import AppTodosList from './AppTodosList.vue'

@Component({
  components: {
    AppTodosForm,
    AppTodosList
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore
  todoTask: string = ''
  
  get todosCount() {
    return this.$store.getters['todos/todosCount']
  }
  get doneCount() {
    return this.$store.getters['todos/doneCount']
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: 12px;
  font-size: 24px;
}
hr {
  height: 1px;
  margin: 12px 0;
  border: none;
  background-color: #ccc;
}
.container {
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
}
.description {
  display: flex;
}
.description > * {
  margin: 10px;
}
</style>
