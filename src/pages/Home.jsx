import { useEffect, useState } from "react"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"

const API = 'http://localhost:4000/api/'

export const Home = () => {
  const [todos, setTodos] = useState(null)

  useEffect(() => {

    const fetchTodos = async () => {
      const response = await fetch(API + 'todos')
      const json = await response.json()

      if (response.ok) {
        setTodos(json)
      }
    }
    fetchTodos()
  }, [])

  return (
    <div className="home">
      <div className="todos">
        {todos && todos.map((todo) => (
          <TodoDetails key={todo._id} todo={todo} />
        ))}
      </div>
      <TodoForm />
    </div>
  )
}

