import Express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session)
  const option = {
    store: new RedisStore({
      host: 'localhost',
      port: 6379
    }),
    secret: 'keyboard cat',
    resave: false
  }
  app.use(session(option))
}
