import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For getting the dynamic contactId
import './Chatbox.css';

const ChatBox = () => {
  const { contactId } = useParams(); // Get contactId from the URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Simulating message loading based on contactId
  useEffect(() => {
    // Here you would typically fetch the messages for the given contactId.
    // For now, we are just using some dummy data.
    setMessages([
      { nickname: 'John', message: 'Hello!', isUser: false, time: '12:00 PM' },
      { nickname: 'Me', message: 'Hey there!', isUser: true, time: '12:01 PM' },
      { nickname: 'John', message: 'How are you?', isUser: false, time: '12:02 PM' }
    ]);
  }, [contactId]); // This hook will run again when the contactId changes

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        nickname: 'Me',
        message: input,
        isUser: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'other'}`}>
            <div className="message-header">
              <span className="nickname">{msg.nickname}</span>
              <span className="time">{msg.time}</span>
            </div>
            <div className="message-body">
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
