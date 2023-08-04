import { describe, expect, it } from 'vitest'
import {
  fireEvent,
  getAllByText,
  render,
  waitFor,
} from '@testing-library/react'
import { TodoProvider } from '../context/Todo'
import { Form } from '@/components/Form'
import { TodoComponent } from '@/components/TodoComponent'

import '@testing-library/jest-dom/extend-expect'

describe('Todo Form', () => {
  it('should add a new todo', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <TodoProvider>
        <Form />
        <TodoComponent />
      </TodoProvider>,
    )

    const input = getByTestId('input-todo')

    await waitFor(() =>
      fireEvent.change(input, { target: { value: 'Hello World' } }),
    )

    await waitFor(() => fireEvent.click(getByText('Add')))

    const todo = getAllByTestId('todo-item')[0]

    expect(todo).toBeInTheDocument()
  })

  it('should remove a todo', async () => {
    const { getByText, getByTestId, getAllByTestId, getAllByText } = render(
      <TodoProvider>
        <Form />
        <TodoComponent />
      </TodoProvider>,
    )

    const input = getByTestId('input-todo')

    await waitFor(() =>
      fireEvent.change(input, { target: { value: 'Hello World' } }),
    )

    await waitFor(() => fireEvent.click(getByText('Add')))

    const todo = getAllByTestId('todo-item')[0]

    expect(todo).toBeInTheDocument()

    const removeButton = getAllByTestId('remove-todo')[0]

    await waitFor(() => fireEvent.click(removeButton))

    expect(
      getAllByText(/You don't have tasks registered yet/i)[0],
    ).toBeInTheDocument()
  })

  it('should select and unselect a todo', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <TodoProvider>
        <Form />
        <TodoComponent />
      </TodoProvider>,
    )

    const input = getByTestId('input-todo')

    await waitFor(() =>
      fireEvent.change(input, { target: { value: 'Hello World' } }),
    )

    await waitFor(() => fireEvent.click(getByText('Add')))

    const todo = getAllByTestId('todo-item')[0]

    expect(todo).toBeInTheDocument()

    const todoButton = getAllByTestId('todo-button')[0]

    await waitFor(() => fireEvent.click(todoButton))

    expect(getAllByTestId('selected-true')[0]).toBeInTheDocument()

    await waitFor(() => fireEvent.click(todoButton))

    expect(getAllByTestId('selected-false')[0]).toBeInTheDocument()
  })

  it('should create a subtask for todo', async () => {
    const { getByText, getByTestId, getAllByTestId, getAllByText } = render(
      <TodoProvider>
        <Form />
        <TodoComponent />
      </TodoProvider>,
    )

    const input = getByTestId('input-todo')

    await waitFor(() =>
      fireEvent.change(input, { target: { value: 'Hello World' } }),
    )

    await waitFor(() => fireEvent.click(getByText('Add')))

    const todo = getAllByTestId('todo-item')[0]

    expect(todo).toBeInTheDocument()

    const subTaskInput = getAllByTestId('input-subtask')[0]

    await waitFor(() =>
      fireEvent.change(subTaskInput, {
        target: { value: 'New Subtask Added' },
      }),
    )

    await waitFor(() => fireEvent.click(getAllByTestId('add-subtask')[0]))

    const subTask = getAllByTestId('subtask-item')[0]

    expect(subTask).toBeInTheDocument()
    expect(getAllByText('New Subtask Added')[0]).toBeInTheDocument()
  })
})
