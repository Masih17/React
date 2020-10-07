
import React, { useState } from 'react';
import TodoTable from './TodoTable'
import '../App.css'


function TodolistDelete() {

    const [task, setTask] = useState({ description: '', date: '' });
    const [todolist, setTodolist] = useState([]);

    const inputChanged = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    const addTask = () => {
        setTodolist([task, ...todolist]);
        setTask({ description: '', date: '' });
    }

    const deleteRow = (index) => {
        const newArray = todolist.filter((arg, i) => i !== index);
        setTodolist(newArray);
    }

    return (
        <div>
            <div>
                <h2>Add to do:</h2>
                <label>Description:</label>
                <input type='text' name='description' value={task.description} onChange={inputChanged} />
                <label>Date:</label>
                <input type='text' name='date' value={task.date} onChange={inputChanged} />
                <button onClick={addTask}>Add </button>
                <TodoTable deleteRow={deleteRow} todoprops={todolist} />
            </div>
        </div>
    );
}

export default TodolistDelete;