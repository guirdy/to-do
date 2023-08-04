import { Task } from '@/context/Todo'
import { ActionTypes } from './actions'
import { produce } from 'immer'

export function todosReducer(state: Task[], action: any) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          alert('To-do already exists.')
          return
        }

        draft.push(action.payload.todo)
      })

    case ActionTypes.DELETE_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          draft.splice(indexDraft, 1)
        }
      })

    case ActionTypes.SELECT_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          draft[indexDraft].isCompleted = !draft[indexDraft].isCompleted
        }
      })

    case ActionTypes.ADD_SUBTASK_TO_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          const indexSubtask = draft[indexDraft].subtasks.findIndex(
            (subtask) => {
              return subtask.description === action.payload.subtask.description
            },
          )

          if (indexSubtask > -1) {
            alert('This subtask already exists for this todo')
            return
          }

          draft[indexDraft].subtasks.push(action.payload.subtask)
        }
      })

    case ActionTypes.CLEAR_TODOS:
      return []
    default:
      return state
  }
}
