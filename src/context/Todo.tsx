'use client'

import {
  addTodoAction,
  deleteTodoAction,
  selectTodoAction,
} from '@/reducers/actions'
import { todosReducer } from '@/reducers/reducer'
import { ReactNode, createContext, useContext, useReducer } from 'react'

interface ContextProps {
  children?: ReactNode
}

export interface Subtask {
  description: string
  isCompleted: boolean
}

export interface Task {
  description: string
  isCompleted: boolean
  subtasks: Subtask[]
}

interface TodosContextTypes {
  todos: Task[]
  handleAddTodo: (task: Task) => void
  handleRemoveTodo: (task: Task) => void
  handleSelectTodo: (task: Task) => void
}

const Todos = createContext({} as TodosContextTypes)

const TodoProvider = ({ children }: ContextProps) => {
  const [todos, dispatch] = useReducer(todosReducer, [] as Task[])

  function handleAddTodo(task: Task) {
    dispatch(addTodoAction(task))
  }

  function handleRemoveTodo(task: Task) {
    dispatch(deleteTodoAction(task))
  }

  function handleSelectTodo(task: Task) {
    dispatch(selectTodoAction(task))
  }

  return (
    <Todos.Provider
      value={{
        todos,
        handleAddTodo,
        handleRemoveTodo,
        handleSelectTodo,
      }}
    >
      {children}
    </Todos.Provider>
  )
}

const useTodosContext = () => {
  const { todos, handleAddTodo, handleRemoveTodo, handleSelectTodo } =
    useContext(Todos)
  return { todos, handleAddTodo, handleRemoveTodo, handleSelectTodo }
}

export { TodoProvider, useTodosContext }
