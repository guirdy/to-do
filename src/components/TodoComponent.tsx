import React, { useState } from 'react'
import { ToDo } from './Todo'
import Clipboard from '@/assets/todo-icon.svg'
import Image from 'next/image'

interface ToDoComponentProps {
  toDoList: string[]
  setToDoList: (text: string[]) => void
}

export function TodoComponent({ toDoList, setToDoList }: ToDoComponentProps) {
  const [completeCount, setCompleteCount] = useState(0)

  const handleDeleteToDo = (deletedToDo: string) => {
    const updateToDo = toDoList.filter((toDo: string) => toDo !== deletedToDo)
    setToDoList(updateToDo)
  }

  const handleTasksCompleted = (isComplete: boolean) => {
    if (!isComplete) {
      if (toDoList.length < completeCount) {
        setCompleteCount(Number(toDoList.length))
        return
      }
      setCompleteCount((count) => {
        return count + 1
      })
      return
    }

    setCompleteCount((count) => {
      if (count > 0) {
        return count - 1
      }
      return 0
    })
  }

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
            {toDoList.length}
          </span>
        </h1>
        <h1 className="text-secondary font-bold text-sm">
          Completed{' '}
          <span
            className="
              bg-dark-400 text-gray-200 rounded-full px-2 py-1
              sm:inline block text-center
            "
          >
            {completeCount} de {toDoList.length}
          </span>
        </h1>
      </div>

      {toDoList.length ? (
        <div className="w-full flex flex-col justify-center items-center rounded-md">
          {toDoList.map((description) => (
            <ToDo
              key={description}
              description={description}
              handleTasksCompleted={handleTasksCompleted}
              handleDeleteToDo={handleDeleteToDo}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center border-t border-gray-300 rounded-md p-8">
          <Image src={Clipboard} alt="clipboard" className="mb-4" />
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
