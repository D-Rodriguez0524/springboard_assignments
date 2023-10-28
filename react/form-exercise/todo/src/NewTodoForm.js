import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

const NewTodoForm = ({ createTodo }) => {

    const [task, setTask] = useState('');

    const handleChange = e => {
        const { value } = e.target;
        setTask(value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        createTodo({ task, id: uuid() });
        setTask('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="task">Task: </label>
                    <input
                        id="task"
                        name="task"
                        type="text"
                        onChange={handleChange}
                        value={task}
                    />
                    <button id="todoBtn">Add task</button>
                </div>

            </form>
        </div>
    )
}

export default NewTodoForm;