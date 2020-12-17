import React, { useState, useEffect } from 'react';
import Table from 'material-table';
import Moment from 'react-moment';
import TableContainer from '@material-ui/core/TableContainer';


function TrainingList(props) {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(res => res.json())
            .then(data => {
                setTrainings(data);
            })
            .catch(err => console.error(err));;
    };


    const columns = [

        {
            title: "Workout",
            field: "activity",
            sorting: true
        },
        {
            title: "Date",
            field: "date",
            render: rowdate => (
                <Moment format="DD.MM.YYYY">{rowdate.date}</Moment>
            ),
            defaultSort: 'asc'
        },
        {
            title: "Time",
            field: "date",
            render: rowdate => (
                <Moment format=" HH:mm">{rowdate.date}</Moment>
            ),
        },
        {
            title: "Duration (min)",
            field: "duration"
        },
        {
            title: 'Customer',
            field: "customer.firstname, customer.lastname",
            render: row => (
                <span>{row.customer.firstname + " " + row.customer.lastname}</span>
            )
        }
    ];

    return (
        <div style={{ margin: '50px' }}>
            <div>
                <TableContainer >
                    <Table
                        title="Trainings"
                        columns={columns}
                        data={trainings}
                        options={{ pageSize: 10, pageSizeOptions: [10, 20, 40] }}
                    />
                </TableContainer>
            </div>
        </div>
    );
};

export default TrainingList;