import React from 'react';
import './Messages.css'; // For message styling

const Messages = ({ nickname, message, isUser, time }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'other'}`}>
      <div className="message-header">
        <span className="nickname">{nickname}</span>
        <span className="time">{time}</span>
      </div>
      <div className="message-body">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Messages;
