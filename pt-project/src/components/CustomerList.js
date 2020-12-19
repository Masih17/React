import React, { useState, useEffect } from "react";
import Table from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Addcustomer from './AddCustomer';
import Addtraining from "./AddTraining";
import Snackbar from '@material-ui/core/Snackbar';
import Editcustomer from './EditCustomer';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';


function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => {
                setCustomers(data.content);
            });
    };

    const deleteCustomer = customerData => {

        if (window.confirm("Are you sure you want to delete " + customerData.firstname + "?")) {
            fetch(customerData.links[0].href, {
                method: 'DELETE'
            })
                .then(res => getCustomers())
                .then(_ => setMsg(customerData.firstname + ' ' + customerData.lastname + ' was deleted succesfully'))
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
            .then(_ => setMsg('Customer added succesfully'))
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

    const addTraining = (link, training) => {

        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(res => getCustomers())
            .then(res => {
                setMsg('Training added succesfully');
                setOpen(true);
            })

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
                <IconButton >
                    <Tooltip title="Delete" >
                        <DeleteIcon
                            color="secondary"
                            onClick={() => deleteCustomer(customerData)}
                        ></DeleteIcon>
                    </Tooltip>
                </IconButton>
            ),
            sorting: false
        },
        {
            title: "Edit",
            field: "links[0].href",
            render: customerData => (
                // Name of the props here should match the one in component of course!
                <Editcustomer updateCustomer={updateCustomer} customer={customerData} />
            ),
            sorting: false
        },
        {
            title: "Add training",
            render: rowData => (
                <Addtraining
                    addTraining={addTraining}
                    customerId={rowData.links[0].href}
                />
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
    ];

    return (

        <div style={{ margin: '50px' }}>
            <Addcustomer addCustomer={addCustomer} />
            <Paper>
                <Table
                    title="Customers"
                    columns={columns}
                    data={customers}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 40],
                        headerStyle: {
                            backgroundColor: '#e8f6ff',
                            height: '90px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }
                    }}
                />
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    );
}

export default Customerlist; 