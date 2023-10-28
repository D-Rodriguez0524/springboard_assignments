import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {

    const [todos, setTodos] = useState([]);

    const create = newTodo => {
        setTodos(todos => [...todos, newTodo]);
    }

    // delete a todo by id
    const remove = id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };

    const todoComponents = todos.map(todo => (
        <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            remove={remove}
        />
    ));
    return (
        <div>
            <NewTodoForm createTodo={create} />
            <ul>{todoComponents}</ul>
        </div>
    )
}

export default TodoList;