<template>
  <li
    class="todo"
    v-bind:class="{ done: data.done }"
   >
    <button v-on:click="doneTodo">done</button>
    <span class="dateLabel">{{ dateLabel }}</span>
    <span>{{ data.task }}</span>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { Todo } from '../store/todos/type'

@Component
export default class extends Vue {
  $store!: Vuex.ExStore
  @Prop() data!: Todo
  
  doneTodo() {
    this.$store.dispatch('todos/asyncDoneTodo', {
      id: this.data.id
    })
  }
  get dateLabel() {
    const date = this.data.createdAt
    const day = `${date.getMonth() + 1}/${date.getDate()}`
    const time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return `${day} ${time}`
  }
}
</script>

<style scoped>
.todo {
  list-style: none;
  margin: 4px 0;
  user-select: none;
}
.todo.done {
  opacity: .2;
}
.todo.done button {
  pointer-events: none;
}
.dateLabel {
  display: inline-block;
  width: 80px;
  padding: 4px;
  font-size: 10px;
  border-radius: 3px;
  color: #fff;
  background-color: #4bbd9f;
}
</style>
