import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
// ______________________________________________________
//
export const state = (): S => ({
  count: 0
})
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  double(state) {
    return state.count * 2
  },
  expo2(state) {
    return state.count ** 2
  },
  expo(state) {
    return amount => state.count ** amount
  }
}
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  setCount(state, payload) {
    state.count = payload.amount
  },
  multi(state, payload) {
    state.count = state.count * payload
  },
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  asyncSetCount(ctx, payload) {
    ctx.commit('setCount', { amount: payload.amount })
  },
  asyncMulti(ctx, payload) {
    ctx.commit('multi', payload)
  },
  asyncIncrement(ctx) {
    ctx.commit('increment')
  },
  asyncDecrement(ctx) {
    ctx.commit('decrement')
  }
}
