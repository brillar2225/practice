import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onChange = (event) => {
    setTodo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (todo === '') {
      return;
    }

    setTodo('');
    setTodos((currArray) => [todo, ...currArray]);
  };
  console.log(todos);

  return (
    <div>
      <h1>Amount of TODOS: {todos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Wrtie your to-do...'
          value={todo}
          onChange={onChange}
        />
        <button type='submit'>Add To-Do</button>
      </form>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <input type='checkbox' name={item} id={index} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
