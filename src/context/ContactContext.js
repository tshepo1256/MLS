import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      type: 'CLIENT',
      email: 'john@example.com',
      phone: '+27123456789',
      address: '123 Main St, Cape Town',
    },
    {
      id: 2,
      name: 'Jane Smith',
      type: 'WITNESS',
      email: 'jane@example.com',
      phone: '+27987654321',
      address: '456 Park Ave, Johannesburg',
    },
  ]);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, ...updatedContact } : contact
    ));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
}; 