
const TodoDetails = ({ todo }) => {

  return (
    <div className="todo-details">
      <h2>{todo.title}</h2>
      <p><strong>{todo.body}</strong></p>
      <p>{todo.updatedAt}</p>
    </div>
  )
}

export default TodoDetails