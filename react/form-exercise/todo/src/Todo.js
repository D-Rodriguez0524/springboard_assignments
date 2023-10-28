import React from "react";

const Todo = ({ task, id, remove }) => {

    const handleDelete = () => remove(id);
    return (
        <div>
            <li>{task}</li>
            <button onClick={handleDelete} >X</button>
        </div>
    )
}

export default Todo;