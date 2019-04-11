<template>
  <div class="container">
    <h3>Counter</h3>
    <div class="description">
      <p>count:{{ count }}</p>
      <p>double:{{ double }}</p>
      <p>expo2:{{ expo2 }}</p>
    </div>
    <hr />
    <div class="form">
      <button v-on:click="increment">+1</button>
      <button v-on:click="decrement">-1</button>
      <AppCounterForm />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppCounterForm from './AppCounterForm.vue'

@Component({ components: { AppCounterForm } })
export default class extends Vue {
  $store!: Vuex.ExStore
  inputCount!: string

  get count() {
    return this.$store.state.counter.count
  }
  get double() {
    return this.$store.getters['counter/double']
  }
  get expo2() {
    return this.$store.getters['counter/expo2']
  }
  increment() {
    this.$store.dispatch('counter/asyncIncrement')
  }
  decrement() {
    this.$store.dispatch('counter/asyncDecrement')
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
.description, .form {
  display: flex;
  overflow: hidden;
}
.description > * {
  margin: 6px;
}
.form > * {
  margin: 2px;
}
</style>
