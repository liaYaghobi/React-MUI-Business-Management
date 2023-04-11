import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AppCalendar.css'; // Import the CSS file

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Meeting',
    start: moment().toDate(),
    end: moment().add(1, 'hour').toDate(),
  },
  {
    title: 'Conference',
    start: moment().add(3, 'days').toDate(),
    end: moment().add(4, 'days').toDate(),
  },
];

const AppCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectEvent = (event) => {
    console.log('event', event);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  return (
    <div className="calendar-container"> {/* Add a container for the calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        defaultView="agenda"
      />
    </div>
  );
};

export default AppCalendar;
