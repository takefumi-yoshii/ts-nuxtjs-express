// ______________________________________________________
//
export interface Todo {
  id: string
  createdAt: Date
  task: string
  done: boolean
}
export interface S {
  todos: Todo[]
}
// ______________________________________________________
//
export interface G {
  todosCount: number
  doneCount: number
}
export interface RG {
  'todos/todosCount': G['todosCount']
  'todos/doneCount': G['doneCount']
}
// ______________________________________________________
//
export interface M {
  addTodo: { todo: Todo }
  doneTodo: { id: string }
}
export interface RM {
  'todos/addTodo': M['addTodo']
  'todos/doneTodo': M['doneTodo']
}
// ______________________________________________________
//
export interface A {
  asyncAddTodo: { todo: Todo }
  asyncDoneTodo: { id: string }
}
export interface RA {
  'todos/asyncAddTodo': A['asyncAddTodo']
  'todos/asyncDoneTodo': A['asyncDoneTodo']
}
