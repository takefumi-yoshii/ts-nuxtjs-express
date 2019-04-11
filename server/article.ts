import express from 'express'
import { ArticleData } from '../types/article'

function mock(id: string): Promise<ArticleData> {
  return new Promise(resolve => {
    resolve({
      article: {
        created_at: 'Wed Apr 10 2019 23:40:44 GMT+0900 (JST)',
        title: `Hello Nuxt ${id}`,
        author: 'takepepe',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia adipisci distinctio assumenda optio. Enim at hic recusandae corrupti. Sed fugiat, error ad molestiae dolorum omnis obcaecati eligendi rerum quisquam nesciunt!'
      }
    })
  })
}

export default (app: express.Application) => {
  app.get('/api/v1/article/:id', (req, res) => {
    ;(async () => {
      const data = await mock(req.params.id)
      res.send(data)
    })()
  })
}
