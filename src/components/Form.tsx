'use client'

import { useState, FormEvent } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { TodoComponent } from './TodoComponent'

export function Form() {
  const [toDoList, setToDoList] = useState<string[]>([])
  const [inputText, setInputText] = useState('')

  const disableButton = !inputText.length

  const handleCreateNewToDo = (
    event: FormEvent<HTMLFormElement>,
    text: string,
  ) => {
    event.preventDefault()
    setToDoList([...toDoList, text])
    setInputText('')
  }

  return (
    <>
      <div className="flex -mt-7 mb-12 justify-center w-full max-w-4xl mx-auto px-8">
        <form
          className="flex justify-between gap-4 w-full"
          onSubmit={(event) => handleCreateNewToDo(event, inputText)}
        >
          <input
            type="text"
            placeholder="Add a new task"
            value={inputText}
            required
            onChange={(e) => setInputText(e.target.value)}
            className="
              flex-1 text-sm bg-dark-400 p-4 border border-dark-900
              rounded text-gray-100 focus:border-transparent focus:ring-2
              ring-secondary outline-none w-full
            "
          />
          <button
            disabled={disableButton}
            className="
              flex items-center gap-2 text-gray-100 bg-primary p-4 rounded
              font-semibold text-xs border-none cursor-pointer transition
              duration-200 hover:bg-blue-500
            "
          >
            Add <IoMdAddCircleOutline size={19} />
          </button>
        </form>
      </div>
      <TodoComponent toDoList={toDoList} setToDoList={setToDoList} />
    </>
  )
}
