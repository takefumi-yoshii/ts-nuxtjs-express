import { StoreContext } from 'vuex'
import { Context } from '../types/nuxt'

export const actions = {
  nuxtServerInit(store: StoreContext, ctx: Context) {
    // store.dispatch が payload まで推論できる
    // ctx.req.session が プログラマー が定義した値まで推論できる
  }
}
