<template>
  <div class="container">
    <h2>
      {{article.title}}
    </h2>
    <div v-html="article.body" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ArticleData } from '../types/article'

@Component
export default class extends Vue {
  @Prop()
  article!: ArticleData
}

</script>

<style scoped>
h2 {
  margin-bottom: 12px;
  font-size: 24px;
}
.container {
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
}
</style>
