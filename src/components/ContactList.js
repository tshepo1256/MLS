import React from 'react';
import { Link } from 'react-router-dom';
import './ContactList.css'; // Add any styling for contacts list here

const ContactList = () => {
  const contacts = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];

  return (
    <div className="contact-list">
      <h3>Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/chats/${contact.id}`} className="contact-item">
              <span className="contact-name">{contact.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
