import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function TrainingsCalendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
        
    useEffect(() => {
        getTrainings();
        }, []);
    
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    };
    
    return(
        <div>
            <h1>Calendar</h1>
            <Calendar
        localizer={localizer}
        events={trainings}
        titleAccessor={(event) => {
            return event.activity + " - " + event.customer.firstname;
          }}
          startAccessor={(event) => {
            return moment(event.date).toDate();
          }}
          endAccessor={(event) => {
            return moment(event.date).add(event.duration, "minutes").toDate();
          }}
          style={{ height: 500 }}
      />
        </div>
    )
    
    }
export default TrainingsCalendar;