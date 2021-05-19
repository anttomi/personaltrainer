import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);
    

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        console.log("Trainings fetched succesfully")
        console.log(trainings)
    }

    const deleteTraining = (oldData) => {
        fetch("https://customerrest.herokuapp.com/api/trainings/"+oldData.id, {
            method: 'DELETE',
            body: JSON.stringify(oldData),
            headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchTrainings())
        .catch(err => console.err(err))
    }

    const columns = [
        { title: 'Activity', field: 'activity'},
        { title: 'Date', field: 'date', type: 'datetime'},
        { title: 'Duration', field: 'duration'},
        { title: 'Customer', render: (row) => row.customer.firstname + " " + row.customer.lastname}
    ]

    

    return (
        <div>
            <MaterialTable
            title="Trainings"
            columns={columns}
            data={trainings}
            editable={{
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        deleteTraining(oldData)
    
                        resolve();
                    }, 1000);
                })
            }}
                />
        </div>
    )
}

export default Traininglist;