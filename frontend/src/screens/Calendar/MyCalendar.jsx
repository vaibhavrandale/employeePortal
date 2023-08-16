// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function MyCalendar() {
//   // Define a state to track the selected date
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Define a function to handle date selection
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     // You can perform any actions you want when a date is selected
//     // For example, you can update events or data related to the selected date.
//   };

//   return (
//     <div
//       className="container "
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // border: '1px solid red',
//       }}
//     >
//       <h2>My Calendar App</h2>
//       {/* Render the Calendar component */}
//       <Calendar onChange={handleDateChange} value={selectedDate} />
//     </div>
//   );
// }

// export default MyCalendar;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  // Define a state to track the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define a state to manage events
  const [events, setEvents] = useState([]);

  // Define a function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Define a function to add events
  const addEvent = () => {
    // Prompt the user for event details (you can use a modal or a form)
    const eventTitle = prompt('Enter event title:');
    if (eventTitle) {
      // Create a new event object
      const newEvent = {
        title: eventTitle,
        date: selectedDate,
      };
      // Add the event to the events array
      setEvents([...events, newEvent]);
    }
  };

  // Define a function to render events on the calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventForDate = events.find(
        (event) => event.date.toDateString() === date.toDateString()
      );
      if (eventForDate) {
        return <p>{eventForDate.title}</p>;
      }
    }
    return null;
  };

  return (
    <div
      className="container "
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '1px solid red',
      }}
    >
      <h1>My Calendar App</h1>
      <button onClick={addEvent}>Add Event</button>
      {/* Render the Calendar component */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
}

export default MyCalendar;
