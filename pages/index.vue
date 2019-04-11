<template>
  <div class="wrapper">
    <h1 class="title">
      {{title}}
    </h1>
    <div class="app-container">
      <AppArticle :article="article" />
      <AppCounter />
      <AppTodos />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Context } from "../types/nuxt"
import { ArticleData } from '../types/article'
import AppArticle from '../components/AppArticle.vue'
import AppCounter from '../components/AppCounter.vue'
import AppTodos from '../components/AppTodos.vue'

interface Data {
  title: string
}
interface AsyncData {
  article: {
    created_at: string
    title: string
    author: string
    body: string
  }
}

@Component({
  components: {
    AppArticle,
    AppCounter,
    AppTodos
  }
})
export default class extends Vue implements Data, AsyncData {
  title = 'Nuxt x TypeScript'
  article = {
    created_at: '',
    title: '',
    author: '',
    body: ''
  }
  async asyncData({ query, $axios }: Context): Promise<AsyncData> {
    const { data } = await $axios.get<ArticleData>(
      `/api/v1/article/${query.page || 0}`
    )
    return { article: data.article }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}
.wrapper {
  padding: 40px;
}
.app-container {
  display: flex;
  justify-content: space-between;
}
.app-container > * {
  width: 33%;
  flex: 0 0 auto;
}
</style>
