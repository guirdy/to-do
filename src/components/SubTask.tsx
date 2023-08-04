import { useState } from 'react'
import { BsCircle } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { Subtask, Task, useTodosContext } from '@/context/Todo'

interface ToDoProps {
  subtask: Subtask
}

export function SubTask({ subtask }: ToDoProps) {
  const { handleRemoveTodo, handleSelectTodo } = useTodosContext()

  // const handleOnClickDelete = () => {
  //   handleRemoveTodo(todo)
  // }

  // const handleSelected = () => {
  //   handleSelectTodo(todo)
  // }

  return (
    <>
      <div
        data-testid="subtask-item"
        className="w-full flex justify-between mb-4"
      >
        <button
          data-testid="subtask-button"
          className={`flex justify-between items-center w-full bg-dark-400 ${
            subtask.isCompleted ? 'text-gray-300' : 'text-gray-100'
          } py-2 px-6 border-none rounded-l-md ${
            subtask.isCompleted ? 'border-r-0' : 'border-r border-dark-500'
          }`}
          // onClick={handleSelected}
        >
          <div
            data-testid={`selected-subtask-${subtask.isCompleted}`}
            className="flex items-center gap-3"
          >
            {subtask.isCompleted ? (
              <AiFillCheckCircle className="text-white-200 w-3" />
            ) : (
              <BsCircle className="text-white-200 w-3" />
            )}
            <span
              className={`text-sm ${subtask.isCompleted ? 'line-through' : ''}`}
            >
              {subtask.description}
            </span>
          </div>
        </button>
        <div>
          <button
            data-testid="remove-subtask"
            className="
            flex justify-center items-center bg-none border-none cursor-pointer
            p-1 transition-colors duration-200 hover:bg-dark-900
            rounded-r-md px-4 h-full bg-dark-400
          "
            // onClick={handleOnClickDelete}
          >
            <HiOutlineTrash className="text-gray-300" />
          </button>
        </div>
      </div>
    </>
  )
}
