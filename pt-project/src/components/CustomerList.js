import React, { useState, useEffect } from "react";
import Table from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Addcustomer from './AddCustomer';
import Addtraining from "./AddTraining";
import Snackbar from '@material-ui/core/Snackbar';
import Editcustomer from './EditCustomer';

function Customerlist(props) {

    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    };

    const deleteCustomer = link => {
        if (window.confirm("Are you sure?")) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(res => getCustomers())
                .then(_ => setMsg('Customer was deleted succesfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err));
        }
    };

    //Passed to other components works fine
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => getCustomers())
            .then(_ => setMsg('Car added succesfully'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err));
    };

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer data updated succesfully');
                setOpen(true);
            })
            .catch(err => console.error(err));
    };

    const saveTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(res => getCustomers())
            .then(_ => setMsg('Training added succesfully'))
            .catch(err => console.error(err));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: "Delete",
            field: "links[0].href",
            render: customerData => (
                <DeleteIcon
                    color="secondary"
                    style={{ cursor: "pointer" }}
                    onClick={(event, rowData) => deleteCustomer(event, rowData)}
                ></DeleteIcon>
            ),
            sorting: false
        },
        {
            title: "Edit",
            field: "links[0].href",
            render: customerData => (
                //the JSX name of the props show match the one in component of course!
                <Editcustomer updateCustomer={updateCustomer} customer={customerData} />
            ),
            sorting: false
        },
        {
            title: "First name",
            field: "firstname"
        },
        {
            title: "Last name",
            field: "lastname"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "Phone",
            field: "phone"
        },
        {
            title: "Address",
            field: "streetaddress"
        },
        {
            title: "Postcode",
            field: "postcode"
        },
        {
            title: "City",
            field: "city"
        },
        {
            title: "Add training",
            render: rowData => (
                <Addtraining
                    addTraining={saveTraining}
                    customerId={rowData.links[0].href}
                />
            ),
            sorting: false
        }
    ];

    return (
        <div style={{ margin: '70px' }}>
            <Addcustomer addCustomer={addCustomer} />
            <Table
                title="Trainings"
                columns={columns}
                data={customers}
                options={{ pageSize: 10, pageSizeOptions: [10, 20, 40] }}
            />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    );
}

export default Customerlist; 