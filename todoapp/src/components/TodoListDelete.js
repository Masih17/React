import React, { useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../App.css'


function TodolistDelete() {

    // saving today's date to a variable 
    const curr = new Date();
    curr.setDate(curr.getDate());
    const todayDate = curr.toISOString().substr(0, 10);

    // today's date is now the default value of date field
    const [task, setTask] = useState({ description: '', date: todayDate, priority: '' });
    const [todolist, setTodolist] = useState([]);

    const inputChanged = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    const addTask = () => {
        setTodolist([task, ...todolist]);
        setTask({ description: '', date: todayDate, priority: '' });
    }

    const deleteRow = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodolist(todolist.filter((task, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
        } else {
            alert('Select row first');
        }
    }
    const gridRef = React.useRef(); // Can also import this of course.

    const columns = [
        { headerName: 'Description', field: 'description', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        {
            headerName: 'Priority', field: 'priority', sortable: true, filter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        }
    ]
    return (
        <div className='body'>

            <h1>Add your ToDo:</h1>

            <div style={{ padding: '30px', background: '#4d5441' }}>
                <input type='text' name='description' placeholder='Description' value={task.description} onChange={inputChanged} />
                <input type='date' name='date' placeholder='date' value={task.date} onChange={inputChanged} />
                <input type='text' name='priority' placeholder='Priority' value={task.priority} onChange={inputChanged} />
                <button onClick={addTask}>Add </button>
                <button onClick={deleteRow}>Delete</button>
            </div>

            <div className="ag-theme-material" style={{ height: '700px', width: '55%', margin: 'auto'}}>
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