

import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, DateLocalizer, momentLocalizer } from "react-big-calendar";
import moment, { duration } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
function PtCalendar() {

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

    // Formatting Date string to date and add durations

    const dateFormatter = (string, duration) => {
        console.log(string, duration);
        let initilTime = moment(string).format('YYYY-MM-DD HH:MM:ss.sss');
        let timePlusDuration = moment(initilTime).add(duration, 'minute').format('yyyy-MM-DD HH:MM:ss ');
        return timePlusDuration;
    };


    let events = [];
    for (let i = 0; i < trainings.length; i++) {
        events[i] = {
            title:
                trainings[i].activity +
                " / " +
                trainings[i].customer.firstname +
                " " +
                trainings[i].customer.lastname,
            start: dateFormatter(trainings[i].date, 0),
            end: dateFormatter(trainings[i].date, duration),
            allDay: false
        };
    }

    return (
        <div className="container mt-3" style={{ height: "80vh", margin: '60px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}

export default PtCalendar;