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
      <div className='todo-details-text'>
        <h2>{todo.title}</h2>
        <p>
          <strong>{todo.body}</strong>
        </p>
        <p>{formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}</p>
      </div>
      <div className='todo-details-btns'>
        <span
          className='material-symbols-outlined edit'
          onClick={handleClick}
        >
          edit
        </span>
        <span class='material-symbols-outlined delete task'>task_alt</span>
        <span
          className='material-symbols-outlined delete'
          onClick={handleClick}
        >
          delete
        </span>
      </div>
    </div>
  )
}

export default TodoDetails
