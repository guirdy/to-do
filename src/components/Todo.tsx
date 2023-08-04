import { useState, FormEvent } from 'react'
import { BsCircle } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { Task, useTodosContext } from '@/context/Todo'
import { SubTask } from './SubTask'
import { IoMdAddCircleOutline } from 'react-icons/io'

interface ToDoProps {
  todo: Task
}

export function ToDo({ todo }: ToDoProps) {
  const { handleRemoveTodo, handleSelectTodo, handleAddSubtaskForTodo } =
    useTodosContext()

  const [inputText, setInputText] = useState('')

  const disableButton = !inputText.length

  const handleOnClickDelete = () => {
    handleRemoveTodo(todo)
  }

  const handleSelected = () => {
    handleSelectTodo(todo)
  }

  const handleCreateNewSubTask = (
    event: FormEvent<HTMLFormElement>,
    text: string,
  ) => {
    event.preventDefault()

    if (!text.length) return

    const subtask = {
      description: text,
      isCompleted: false,
    }

    handleAddSubtaskForTodo(todo, subtask)
    setInputText('')
  }

  return (
    <>
      <div className="w-full flex justify-between mb-4">
        <button
          data-testid="todo-button"
          className={`flex justify-between items-center w-full bg-dark-400 ${
            todo.isCompleted ? 'text-gray-300' : 'text-gray-100'
          } py-4 px-6 border-none rounded-l-md ${
            todo.isCompleted ? 'border-r-0' : 'border-r border-dark-500'
          }`}
          onClick={handleSelected}
        >
          <div
            data-testid={`selected-${todo.isCompleted}`}
            className="flex items-center gap-3"
          >
            {todo.isCompleted ? (
              <AiFillCheckCircle className="text-blue-500" />
            ) : (
              <BsCircle className="text-secondary" />
            )}
            <span className={todo.isCompleted ? 'line-through' : ''}>
              {todo.description}
            </span>
          </div>
        </button>
        <div>
          <button
            data-testid="remove-todo"
            className="
            flex justify-center items-center bg-none border-none cursor-pointer
            p-1 transition-colors duration-200 hover:bg-dark-900
            rounded-r-md px-4 h-full bg-dark-400
          "
            onClick={handleOnClickDelete}
          >
            <HiOutlineTrash className="text-gray-300" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl border-l-2 border-blue-500 mb-12 pl-2">
        {!!todo.subtasks.length && (
          <div className="w-full flex flex-col justify-center items-center rounded-md">
            {todo.subtasks.map((subtask) => (
              <SubTask key={subtask.description} subtask={subtask} />
            ))}
          </div>
        )}

        <form
          className="flex justify-between gap-2 w-full"
          onSubmit={(e) => handleCreateNewSubTask(e, inputText)}
        >
          <input
            data-testid="input-subtask"
            type="text"
            placeholder="Add a subtask for this todo"
            value={inputText}
            required
            onChange={(e) => setInputText(e.target.value)}
            className="
            flex-1 bg-dark-400 text-sm py-1 pl-4 border border-dark-900
            rounded text-gray-100 focus:border-transparent focus:ring-2
            ring-secondary outline-none w-full
          "
          />
          <button
            data-testid="add-subtask"
            type="submit"
            disabled={disableButton}
            className="
            flex items-center gap-2 text-gray-100
            font-semibold border-none cursor-pointer transition
            duration-200 hover:text-blue-500 disabled:opacity-90 disabled:cursor-not-allowed"
          >
            <IoMdAddCircleOutline size={19} />
          </button>
        </form>
      </div>
    </>
  )
}
