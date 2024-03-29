import { useEffect, useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"
import Dialog from "@mui/material/Dialog"

const API = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:4000/api/"

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
  }, [user])

  return (
    <div className='home'>
      <div className='todos'>
        {todos ? (
          todos.length === 0 ? (
            <h1 className='no-todos'>Your next goal?</h1>
          ) : (
            todos.map((todo) => (
              <TodoDetails
                todo={todo}
                key={todo._id}
              />
            ))
          )
        ) : (
          <div className='box'>
            <div className='shadow'></div>
            <div className='gravity'>
              <div className='ball'></div>
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
