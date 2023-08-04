import { useState } from 'react'
import { BsCircle } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { Task, useTodosContext } from '@/context/Todo'

interface ToDoProps {
  todo: Task
}

export function ToDo({ todo }: ToDoProps) {
  const { handleRemoveTodo, handleSelectTodo } = useTodosContext()

  const handleOnClickDelete = () => {
    handleRemoveTodo(todo)
  }

  const handleSelected = () => {
    handleSelectTodo(todo)
  }

  return (
    <div className="w-full flex justify-between mb-12">
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
  )
}
