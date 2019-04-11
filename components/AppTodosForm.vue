<template>
  <form v-on:submit.prevent="addTodo">
    <input type="text" v-model="todoTask" />
    <button>addTodo</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import uuid from 'uuid/v4'

@Component
export default class extends Vue {
  $store!: Vuex.ExStore
  todoTask: string = ''

  addTodo() {
    const todo = {
      id: uuid(),
      createdAt: new Date(),
      task: this.todoTask,
      done: false
    }
    this.$store.dispatch('todos/asyncAddTodo',{ todo }).then(() => {
      this.todoTask = ''
    })
  }
}
</script>
