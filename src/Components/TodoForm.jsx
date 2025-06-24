import { useState } from 'react'
import shortid from 'shortid'

const TodoForm = ({onSubmit}) => {
  const [text, setText] = useState("")
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
        id: shortid.generate(),
        text: text,
        complete: false,
    })
    setText("")
  }
  return (
    <form onSubmit={handleSubmit}>
        <input className='input-field' type="text" onChange={handleChange} value={text} />
        <button className='btn' onClick={handleSubmit}>Add Todo</button>
    </form>
  )
}

export default TodoForm