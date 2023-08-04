import React, { useState } from 'react'
import { ToDo } from './Todo'
import Clipboard from '@/assets/todo-icon.svg'
import Image from 'next/image'
import { useTodosContext } from '@/context/Todo'
import { twMerge } from 'tailwind-merge'

export function TodoComponent() {
  const { todos } = useTodosContext()

  const tasksCompleted = todos.reduce((total, task) => {
    if (task.isCompleted) {
      total++
    }

    return total
  }, 0)

  return (
    <div
      className="
        flex flex-col justify-center items-center w-full max-w-4xl mx-auto
        mb-64 px-8
      "
    >
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-blue-500 font-bold text-sm">
          Created tasks{' '}
          <span
            className="
              bg-dark-400 text-gray-200 rounded-full px-2 py-1
              sm:inline block text-center
            "
          >
            {todos.length}
          </span>
        </h1>
        <h1 className="text-secondary font-bold text-sm">
          Completed{' '}
          <span
            className={twMerge(
              'bg-dark-400 text-gray-200 rounded-full px-2 py-1 sm:inline block text-center',
              tasksCompleted === todos.length &&
                todos.length > 0 &&
                'text-green-400',
            )}
          >
            {tasksCompleted} - {todos.length}
          </span>
        </h1>
      </div>

      {todos.length ? (
        <div
          data-testid="todo-item"
          className="w-full flex flex-col justify-center items-center rounded-md"
        >
          {todos.map((todo) => (
            <ToDo key={todo.description} todo={todo} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center border-t border-gray-300 rounded-md p-8">
          <Image
            src={Clipboard}
            alt="clipboard"
            width={56}
            height={56}
            className="mb-4"
          />
          <strong className="text-center text-gray-300 text-base leading-140%">
            You don't have tasks registered yet
          </strong>
          <span className="text-center text-gray-300 text-base leading-140%">
            Add tasks and organize your to-do list
          </span>
        </div>
      )}
    </div>
  )
}
