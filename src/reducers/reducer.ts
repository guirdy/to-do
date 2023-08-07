import { Task } from '@/context/Todo'
import { Action, ActionTypes } from './actions'
import { produce } from 'immer'
import { toast } from 'react-toastify'

export function todosReducer(state: Task[], action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          toast.error('To-do already exists.')
          return
        }

        draft.push(action.payload.todo)
        toast.success('To-do created successfully.')
      })

    case ActionTypes.DELETE_TODO:
      return produce(state, (draft) => {
        const indexDraft = draft.findIndex((todo) => {
          return todo.description === action.payload.todo.description
        })

        if (indexDraft > -1) {
          draft.splice(indexDraft, 1)
          toast.success('To-do deleted successfully.')
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

    case ActionTypes.SELECT_SUBTASK:
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
            draft[indexDraft].subtasks[indexSubtask].isCompleted =
              !draft[indexDraft].subtasks[indexSubtask].isCompleted
          }
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
            toast.error('This subtask already exists for this todo')
            return
          }

          draft[indexDraft].subtasks.push(action.payload.subtask)
          toast.success('Subtask created successfully.')
        }
      })

    case ActionTypes.DELETE_SUBTASK:
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
            draft[indexDraft].subtasks.splice(indexSubtask, 1)
            toast.success('Subtask deleted successfully.')
          }
        }
      })

    default:
      return state
  }
}
