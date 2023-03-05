import { useTodosContext } from "../hooks/useTodosContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [isTitleCrossedOut, setIsTitleCrossedOut] = useState(false)

  const API = "http://localhost:4000/api/"

  const handleDoneClick = () => {
    setIsTitleCrossedOut(!isTitleCrossedOut)
  }

  const handleDeleteClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(API + "todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json })
    }
  }

  return (
    <div className='todo-details'>
      <div className='todo-details-text'>
        <h2 className={isTitleCrossedOut ? "crossed-out" : ""}>{todo.title}</h2>
        <p>
          <strong className={isTitleCrossedOut ? "crossed-out" : ""}>{todo.body}</strong>
        </p>
        <p>{formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}</p>
      </div>
      <div className='todo-details-btns'>
        <span
          className='material-symbols-outlined'
          onClick={handleDeleteClick}
        >
          edit
        </span>
        <span
          style={{ backgroundColor: "#3CB371" }}
          className='material-symbols-outlined'
          onClick={handleDoneClick}
        >
          task_alt
        </span>
        <span
          style={{ backgroundColor: "#DC3545" }}
          className='material-symbols-outlined '
          onClick={handleDeleteClick}
        >
          delete
        </span>
      </div>
    </div>
  )
}

export default TodoDetails
