import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

export function App() {
  const taksNewRef = useRef();
  let taks = [
    { id: 1, task: "Tarea ", completed: false },
  ];

  const [todos, setTodos] = useState(taks);
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = (event) => {
    const task = taksNewRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });
    taksNewRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    console.log('newTodos', newTodos);
    setTodos(newTodos);
  };

  const onKeyPressNewTaks = (event) => {
    console.log('onKeyPressNewTaks', event.key);
    if(event.key === 'Enter'){
      handleTodoAdd();
    }
  }

  return (
    <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input onKeyPress={onKeyPressNewTaks}  ref={taksNewRef} type="text" placeholder="Nueva tarea" />
        <br />
        <button onClick={handleTodoAdd}>Añadir</button>
        <button onClick={handleClearAll}>Eliminar</button>
        <p>
          Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
          terminar
        </p>
    </Fragment>
  );
}