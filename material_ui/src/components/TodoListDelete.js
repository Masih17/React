import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../App.css';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';


function TodolistDelete() {


    // today's date is now the default value of date field
    //const [date, setDate] = useState(new Date());
    const [task, setTask] = useState({ description: '', priority: '' });
    const [todolist, setTodolist] = useState([]);

    // formating the date


    // handling input changes and setting up the task
    const inputChanged = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    // handling date changes
    const handleDateChange = (date) => {
        const finalDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        setTask(...task, finalDate);
    };

    // adding the task to the todolist array 
    const addTask = () => {
        setTodolist([task, ...todolist]);
        setTask({ description: '', priority: '' });
    };

    // Deleting a row
    const deleteRow = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodolist(todolist.filter((task, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert('Select row first');
        }
    };
    const gridRef = React.useRef(); // Can also import this of course.

    const columns = [
        { headerName: 'Description', field: 'description', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        {
            headerName: 'Priority', field: 'priority', sortable: true, filter: true,
            cellStyle: params => params.value === ("High") ? { color: 'Red' } : { color: 'black' }
        }
    ];
    return (
        <div className='body'>

            <h1>Add your ToDo:</h1>

            <div style={{ padding: '30px' }}>
                <TextField
                    type='text'
                    name='description'
                    placeholder='Description'
                    value={task.description}
                    onChange={inputChanged}
                />

                <DatePicker
                    variant="inline"
                    value={task.date}
                    onChange={date => handleDateChange(date)}
                    format="dd/MM/yyyy"
                />

                <TextField
                    type='text'
                    name='priority'
                    placeholder='Priority'
                    value={task.priority}
                    onChange={inputChanged}
                />

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={addTask}
                >
                    Add
                    </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={deleteRow}
                >
                    Delete
                    </Button>
            </div>

            <div className="ag-theme-material" style={{ border: '2px black', height: '700px', width: '60%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={todolist}
                    animateRows={true}
                >
                </AgGridReact>
            </div>
        </div >
    );
}

export default TodolistDelete;