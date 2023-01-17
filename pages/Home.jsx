import { useEffect, useState } from "react"

export const Home = () => {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:4000/api/todos')
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
          <p key={todo._id}>
            {todo.title}
          </p>
        ))}
      </div>
    </div>
  )
}
