import { useState, useRef, useEffect, useContext } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { TodosContext } from "../context/TodoContext"

const API = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:4000/api/"

const TodoForm = ({ onClose, todo }) => {
  const { dispatch } = useTodosContext()
  const { todos } = useContext(TodosContext)
  const { user } = useAuthContext()
  const [todoToSave, setTodoToSave] = useState(null)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    if (todo) {
      setTodoToSave(todo)
    } else {
      const newTodo = { title: "", body: "" }
      setTodoToSave(newTodo)
    }
  }, [])

  const handleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    setTodoToSave((prevTodo) => ({
      ...prevTodo,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in")
      return
    }

    const method = todoToSave._id ? "PUT" : "POST"
    const type = todoToSave._id ? "UPDATE_TODO" : "CREATE_TODO"
    const URL = todoToSave._id ? API + "todos/" + todo._id : API + "todos"
    const response = await fetch(URL, {
      method,
      body: JSON.stringify(todoToSave),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setTodoToSave({ title: "", body: "" })
      setError(null)
      setEmptyFields([])
      dispatch({ type, payload: json })
      onClose()
    }
  }

  if (!todoToSave) return <div>loading...</div>

  return (
    <form
      className='todo-form'
      onSubmit={handleSubmit}
    >
      <h3> {todoToSave._id ? <span>Edit</span> : <span>Add</span>} a new todo</h3>

      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        onChange={handleChange}
        name='title'
        value={todoToSave.title}
        className={emptyFields.includes("title") ? "error" : ""}
        ref={inputRef}
      />

      <label htmlFor='body'>Body</label>
      <input
        id='body'
        type='text'
        onChange={handleChange}
        name='body'
        value={todoToSave.body}
        className={emptyFields.includes("body") ? "error" : ""}
      />

      <button>Save todo</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TodoForm
