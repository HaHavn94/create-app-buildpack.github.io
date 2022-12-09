import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useEffect, useState } from "react";
import { addMinutes } from 'date-fns';

function Calendar() {
  const [caData, setCaData] = useState([])
 
  const updatedData = caData.map((v) => ({
    title: v.activity + "/ " + v.customer.firstname + " " + v.customer.lastname,
    start: v.date,
    end : addMinutes(new Date(v.date), v.duration)
    
  }));

  useEffect( () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => {
        if (response.ok) 
           return response.json() 
        else 
        alert("Something goes wrong") 
    }
    )
      .then(data => setCaData(data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">     
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}
        events={updatedData}
        eventColor="blue"     
      />     
    </div>
  );
}

export default Calendar;