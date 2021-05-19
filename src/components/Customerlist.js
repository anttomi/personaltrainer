import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddTraining from './addTraining'

function Customerlist() {
    const [customers, setCustomers] = React.useState([]);

    useEffect(() => {
        fetchCustomers();

    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
        console.log("Cars fetched succesfully")
    }

    const columns = [
        { title: '', editable: 'never', field: 'links[0].href',
        render: oldData => <AddTraining addTraining={addTraining} oldData={oldData}/>
        },
        { title: 'First Name', field: 'firstname'},
        { title: 'Last Name', field: 'lastname'},
        { title: 'Streetaddress', field: 'streetaddress'},
        { title: 'Postcode', field: 'postcode' },
        { title: 'City', field: 'city'},
        { title: 'Email', field: 'email'},
        { title: 'Phone', field: 'phone'}
    ]

    const updateCustomer = (newData, oldData) => {
        fetch(oldData.links[0].href , {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const addCustomer = (newData) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const addTraining = (newData) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const deleteCustomer = (oldData) => {
        fetch(oldData.links[0].href, {
            method: 'DELETE',
            body: JSON.stringify(oldData),
            headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }


    return (
        <div>
            <MaterialTable
            title="Customers"
            columns={columns}
            data={customers}
            editable={{onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        addCustomer(newData)
                        
    
                        resolve();
                    }, 1000);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        updateCustomer(newData, oldData)

                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        
                        deleteCustomer(oldData)
                        resolve();
                    }, 1000);
                })
            }}/>
            
        </div>
    )
}

export default Customerlist;