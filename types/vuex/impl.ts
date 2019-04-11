import 'vuex'
import * as Counter from '../../store/counter/type'
import * as Todos from '../../store/todos/type'

declare module 'vuex' {
  type RootState = {
    counter: Counter.S
    todos: Todos.S
  }
  type RootGetters = Counter.RG & Todos.RG
  type RootMutations = Counter.RM & Todos.RM
  type RootActions = Counter.RA & Todos.RA
}
