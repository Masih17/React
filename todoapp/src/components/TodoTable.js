import React from 'react';

function TodoTable(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr >
                        <th >Date</th>
                        <th >Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todoprops.map((item, index) =>
                            <tr key={index}>
                                <td>{item.date} </td>
                                <td>{item.description}</td>
                                <td><button onClick={() => props.deleteRow(index)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default TodoTable;