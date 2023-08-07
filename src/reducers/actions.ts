import { Subtask, Task } from '@/context/Todo'

export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  ADD_SUBTASK_TO_TODO = 'ADD_SUBTASK_TO_TODO',
  REMOVE_SUBTASK_TO_TODO = 'REMOVE_SUBTASK_TO_TODO',
  DELETE_TODO = 'DELETE_TODO',
  SELECT_TODO = 'SELECT_TODO',
  SELECT_SUBTASK = 'SELECT_SUBTASK',
  DELETE_SUBTASK = 'DELETE_SUBTASK',
  CLEAR_TODOS = 'CLEAR_TODOS',
}

export interface Action {
  type: keyof typeof ActionTypes
  payload: any
}

export function addTodoAction(todo: Task) {
  return {
    type: ActionTypes.ADD_TODO,
    payload: {
      todo,
    },
  }
}

export function addSubtaskForTodoAction(todo: Task, subtask: Subtask) {
  return {
    type: ActionTypes.ADD_SUBTASK_TO_TODO,
    payload: {
      todo,
      subtask,
    },
  }
}

export function removeSubtaskForTodoAction(todo: Task) {
  return {
    type: ActionTypes.REMOVE_SUBTASK_TO_TODO,
    payload: {
      todo,
    },
  }
}

export function deleteTodoAction(todo: Task) {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: {
      todo,
    },
  }
}

export function selectTodoAction(todo: Task) {
  return {
    type: ActionTypes.SELECT_TODO,
    payload: {
      todo,
    },
  }
}

export function selectSubtaskAction(todo: Task, subtask: Subtask) {
  return {
    type: ActionTypes.SELECT_SUBTASK,
    payload: {
      todo,
      subtask,
    },
  }
}

export function deleteSubtaskAction(todo: Task, subtask: Subtask) {
  return {
    type: ActionTypes.DELETE_SUBTASK,
    payload: {
      todo,
      subtask,
    },
  }
}

export function clearTodosAction() {
  return {
    type: ActionTypes.CLEAR_TODOS,
  }
}
