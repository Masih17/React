import React, { useState, useEffect } from 'react';
import Table from 'material-table';
import DeleteIcon from "@material-ui/icons/Delete";
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import { Button, decomposeColor } from '@material-ui/core';





function TrainingList(props) {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

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

    const deleteTraining = (id, activity, customer) => {
        if (window.confirm(`Delete ${customer.firstname}'s ${activity} session?`)) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
                method: "DELETE"
            })
                .then(_ => getTrainings())
                .then(_ => setMsg('Training was deleted succesfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err));
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const columns = [
        {
            title: "Actions",
            field: "id",
            render: rowData => (
                <Button>
                    <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteTraining(rowData.id, rowData.activity, rowData.customer)}
                    >
                    </DeleteIcon>
                </Button>
            ),
            sorting: false,

        },
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
                <Table
                    title="Trainings"
                    columns={columns}
                    data={trainings}
                    options={{ pageSize: 10, pageSizeOptions: [10, 20, 40] }}
                />

            </div>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
        </div>
    );
};

export default TrainingList;