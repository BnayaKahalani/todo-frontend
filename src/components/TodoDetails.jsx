import { useTodosContext } from "../hooks/useTodosContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const API = "http://localhost:4000/api/"

  const handleClick = async () => {
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
      <h2>{todo.title}</h2>
      <p>
        <strong>{todo.body}</strong>
      </p>
      <p>{formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}</p>
      <span
        className='material-symbols-outlined'
        onClick={handleClick}
      >
        delete
      </span>
      <span
        className='material-symbols-outlined'
        onClick={handleClick}
      >
        edit
      </span>
    </div>
  )
}

export default TodoDetails
