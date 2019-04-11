import { Context } from "../types/nuxt"

export default (ctx: Context) => {
  // ctx.store.dispatch が payload まで推論できる
  // ctx.req.session が プログラマー が定義した値まで推論できる
}
