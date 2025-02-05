import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Initial Hearing',
      start: '2024-04-01T10:00:00',
      end: '2024-04-01T11:00:00',
      caseId: 1,
      type: 'HEARING',
      location: 'Court Room 3',
    },
    {
      id: 2,
      title: 'Client Meeting',
      start: '2024-04-02T14:00:00',
      end: '2024-04-02T15:00:00',
      caseId: 2,
      type: 'MEETING',
      location: 'Office',
    },
  ]);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}; 