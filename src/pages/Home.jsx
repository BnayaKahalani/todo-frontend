import { useEffect, useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"
import Dialog from "@mui/material/Dialog"

const API = "http://localhost:4000/api/"

export const Home = () => {
  const { todos, dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(API + "todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json })
      }
    }
    if (user) {
      fetchTodos()
    }
  }, [dispatch, user])

  console.log(todos)

  return (
    <div className='home'>
      <div className='todos'>
        {todos ? (
          todos.length === 0 ? (
            <h1 className='no-todos'>What's your goal right now?</h1>
          ) : (
            todos.map((todo) => (
              <TodoDetails
                key={todo._id}
                todo={todo}
              />
            ))
          )
        ) : (
          <div class='box'>
            <div class='shadow'></div>
            <div class='gravity'>
              <div class='ball'></div>
            </div>
          </div>
        )}
        <span
          className='material-symbols-outlined add'
          onClick={handleClickOpen}
        >
          add
        </span>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <TodoForm onClose={handleClose} />
        </Dialog>
      </div>
    </div>
  )
}
