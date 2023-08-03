import { useState } from 'react'
import { BsCircle } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'

interface ToDoProps {
  description: string
  handleTasksCompleted: (isCompleted: boolean) => void
  handleDeleteToDo: (description: string) => void
}

export function ToDo({
  description,
  handleTasksCompleted,
  handleDeleteToDo,
}: ToDoProps) {
  const [selected, setSelected] = useState(false)

  const handleOnClickDelete = () => {
    handleDeleteToDo(description)
    handleTasksCompleted(true)
  }

  const handleSelected = () => {
    setSelected(!selected)
    handleTasksCompleted(selected)
  }

  return (
    <div className="w-full flex justify-between mb-12">
      <button
        className={`flex justify-between items-center w-full bg-dark-400 ${
          selected ? 'text-gray-300' : 'text-gray-100'
        } py-4 px-6 border-none rounded-l-md ${
          selected ? 'border-r-0' : 'border-r border-dark-500'
        }`}
        onClick={handleSelected}
      >
        <div className="flex items-center gap-3">
          {selected ? (
            <AiFillCheckCircle className="text-blue-500" />
          ) : (
            <BsCircle className="text-secondary" />
          )}
          <span className={selected ? 'line-through' : ''}>{description}</span>
        </div>
      </button>
      <div>
        <button
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
