import { useState } from 'react';

function InputTodo({ todo, todos, onChange, onSubmit }) {
  return (
    <div>
      <h1>Amount of TODOS: {todos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Wrtie your To-Do...'
          value={todo}
          onChange={onChange}
        />
        <button type='submit'>Add To-Do</button>
      </form>
    </div>
  );
}

function ItemList({ item, index }) {
  return (
    <li key={index}>
      <input type='checkbox' name={item} id={index} />
      <span>{item}</span>
    </li>
  );
}

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todo === '') {
      return;
    }

    setTodo('');
    setTodos((currArray) => [todo, ...currArray]);
  };

  return (
    <div>
      <InputTodo
        todo={todo}
        todos={todos}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ul>
        {todos.map((item, index) => (
          <ItemList key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default App;
