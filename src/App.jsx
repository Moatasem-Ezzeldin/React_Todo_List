import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm'
import Todo from './Components/Todo'

function App() {
  let [todos, setTodos] = useState([])
  const [todoToShow, setTodoToShow] = useState("all")
  const [toggleAllComplete, setToggleAllComplete] = useState(true)
  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  }
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const updateTodoToShow = (s) => {
    setTodoToShow(s);
  }
  if(todoToShow === "active") {
    todos = todos.filter((todo) => !todo.complete);
  } else if(todoToShow === "complete") {
    todos = todos.filter((todo) => todo.complete);
  }
  const removeAllTodoComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete))
  }
  const handleComplete = (id) => {
    setTodos(todos.map((todo) => {
      if(todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete
        }
      } else {
        return todo;
      }
    }))
  }
  return (
    <div className='container'>
      <TodoForm onSubmit={addTodo} />
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} onToggle={() => handleComplete(todo.id)}/>
        ))
      }
      <div>
        <button className='update-btn btn' onClick={() => updateTodoToShow("all")}>All</button>
        <button className='update-btn btn' onClick={() => updateTodoToShow("active")}>Active</button>
        <button className='update-btn btn' onClick={() => updateTodoToShow("complete")}>Complete</button>
      </div>
      {
        todos.some((todo) => todo.complete)
        ? (<button className='all-btn' onClick={removeAllTodoComplete}>Remove All Complate Todo</button>)
        : null
      }
      <button className='all-btn' onClick={() => {
        setTodos(todos.map((todo) =>(
          {
            ...todo,
            complete: toggleAllComplete,
          }
        )))
        setToggleAllComplete(!toggleAllComplete)
      }}>
        Toggle All Complete : {`${toggleAllComplete}`}
      </button>
    </div>
  )
}

export default App
