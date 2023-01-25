import { useState } from "react"
import { useTodosContext } from "../context/hooks/useTodoContext"

const API = 'http://localhost:4000/api/'

const TodoForm = () => {
  const {dispatch} = useTodosContext()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo = { title, body }

    const response = await fetch(API + 'todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setTitle('')
      setBody('')
      setError(null)
      setEmptyFields([])
      console.log('New todo added', json)
      dispatch({type: 'CREATE_TODO', payload: json})
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>Add a new todo</h3>

      <label htmlFor="">Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
        />

      <label htmlFor="">Body</label>
      <input
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
        className={emptyFields.includes('body') ? 'error' : ''}
        />

      <button>Add todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm