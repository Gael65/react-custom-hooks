import { useEffect, useReducer } from 'react'
import { toDoReducer } from '../08-useReducer/toDoReducer'

const init = () => {
  return JSON.parse(window.localStorage.getItem('todos') || [])
}

export const useTodos = () => {
  const [todos, dispatch] = useReducer(toDoReducer, [], init)

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewToDo = (todo) => {
    const action = {
      type: 'Add ToDo',
      payload: todo
    }

    dispatch(action)
  }

  const handleRemoveToDo = (id) => {
    dispatch({
      type: 'Remove ToDo',
      payload: id
    })
  }

  const handleToggleToDo = (id) => {
    dispatch({
      type: 'Toggle ToDo',
      payload: id
    })
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewToDo,
    handleRemoveToDo,
    handleToggleToDo
  }
}
