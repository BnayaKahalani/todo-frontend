import { useTodosContext } from "../context/hooks/useTodoContext"

import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TodoDetails = ({ todo }) => {
  const {dispatch} = useTodosContext()

  const API = 'http://localhost:4000/api/'

  const handleClick = async () => {
    const response = await fetch(API + 'todos/' + todo._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TODO', payload: json })
    }
  }

  return (
    <div className="todo-details">
      <h2>{todo.title}</h2>
      <p><strong>{todo.body}</strong></p>
      <p>{formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TodoDetails