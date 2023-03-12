import { useEffect, useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Dialog from "@mui/material/Dialog"

const API = "http://localhost:4000/api/"

export const Home = () => {
  const { todos, dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [open, setOpen] = useState(false)

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    // Update the order of the todos based on the drag and drop
    const newTodos = Array.from(todos)
    const [removed] = newTodos.splice(source.index, 1)
    newTodos.splice(destination.index, 0, removed)

    // Update the order of the todos in the context
    dispatch({ type: "SET_TODOS", payload: newTodos })
  }

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

  return (
    <div className='home'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todos'>
          {(provided) => (
            <div
              className='todos'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos ? (
                todos.length === 0 ? (
                  <h1 className='no-todos'>Your next goal?</h1>
                ) : (
                  todos.map((todo, index) => (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoDetails todo={todo} />
                        </div>
                      )}
                    </Draggable>
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
              {provided.placeholder}
              <Dialog
                open={open}
                onClose={handleClose}
              >
                <TodoForm onClose={handleClose} />
              </Dialog>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
