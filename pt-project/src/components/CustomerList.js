import React, { useState, useEffect } from "react";
import Table from "material-table";


function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    };

    const columns = [

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
        <div style={{ margin: '70px' }}>
            <Table
                title="Customers"
                data={customers}
                columns={columns}
                options={{ sorting: true }}
            />
        </div>
    );
}

export default Customerlist;