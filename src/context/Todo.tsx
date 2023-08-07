'use client'

import {
  addSubtaskForTodoAction,
  addTodoAction,
  deleteSubtaskAction,
  deleteTodoAction,
  selectSubtaskAction,
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
  handleSelectSubtask: (task: Task, subtask: Subtask) => void
  handleRemoveSubtask: (task: Task, subtask: Subtask) => void
  handleAddSubtaskForTodo: (task: Task, subtask: Subtask) => void
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

  function handleSelectSubtask(task: Task, subtask: Subtask) {
    dispatch(selectSubtaskAction(task, subtask))
  }

  function handleRemoveSubtask(task: Task, subtask: Subtask) {
    dispatch(deleteSubtaskAction(task, subtask))
  }

  function handleAddSubtaskForTodo(task: Task, subtask: Subtask) {
    dispatch(addSubtaskForTodoAction(task, subtask))
  }

  return (
    <Todos.Provider
      value={{
        todos,
        handleAddTodo,
        handleRemoveTodo,
        handleSelectTodo,
        handleSelectSubtask,
        handleRemoveSubtask,
        handleAddSubtaskForTodo,
      }}
    >
      {children}
    </Todos.Provider>
  )
}

const useTodosContext = () => {
  const {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleSelectTodo,
    handleSelectSubtask,
    handleRemoveSubtask,
    handleAddSubtaskForTodo,
  } = useContext(Todos)
  return {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleSelectTodo,
    handleSelectSubtask,
    handleRemoveSubtask,
    handleAddSubtaskForTodo,
  }
}

export { TodoProvider, useTodosContext }
