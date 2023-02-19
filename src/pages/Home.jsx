import { useEffect } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"

const API = "http://localhost:4000/api/"

export const Home = () => {
  const { todos, dispatch } = useTodosContext()
  const { user } = useAuthContext()

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
      <div className='todos'>
        {todos &&
          todos.map((todo) => (
            <TodoDetails
              key={todo._id}
              todo={todo}
            />
          ))}
        <span class='material-symbols-outlined add'>add</span>
      </div>
      {/* <TodoForm /> */}
    </div>
  )
}
