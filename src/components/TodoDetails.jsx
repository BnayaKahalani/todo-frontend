import { useTodosContext } from "../hooks/useTodosContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import Dialog from "@mui/material/Dialog"
import TodoForm from "../components/TodoForm"

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [open, setOpen] = useState(false)

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

  const handleUpdateClick = async (fieldsToUpdate) => {
    console.log("todo BEFORE:", todo)
    console.log("fieldsToUpdate", fieldsToUpdate)
    if (!user) return

    const response = await fetch(API + "todos/" + todo._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(fieldsToUpdate),
    })
    const json = await response.json()
    console.log("json", json)

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json })
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='todo-details'>
      <div className='todo-details-text'>
        <h2 className={todo.crossedOut ? "crossed-out" : ""}>{todo.title}</h2>
        <p>
          <strong className={todo.crossedOut ? "crossed-out" : ""}>{todo.body}</strong>
        </p>
        <p>{formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}</p>
      </div>
      <div className='todo-details-btns'>
        <span
          className='material-symbols-outlined'
          onClick={handleClickOpen}
        >
          edit
        </span>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <TodoForm onClose={handleClose} />
        </Dialog>
        <span
          style={{ backgroundColor: "#3CB371" }}
          className='material-symbols-outlined'
          onClick={() => handleUpdateClick({ crossedOut: !todo.crossedOut })}
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
