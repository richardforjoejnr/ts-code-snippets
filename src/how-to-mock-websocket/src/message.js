import React, { useEffect, useState } from 'react';

function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8013');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'data') {
        setMessages(prevMessages => [...prevMessages, message]);
      }
      
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
<div>
  <h2 data-cy="message-title">Received Messages</h2>
  {messages.map((message, index) => (
    <div key={index} data-cy={`message-${index}`}>
      <p data-cy={`message-${index}-name`}><strong>Name:</strong> {message.name}</p>
      <p data-cy={`message-${index}-age`}><strong>Age:</strong> {message.age}</p>
      <p data-cy={`message-${index}-title`}><strong>Title:</strong> {message.title}</p>
      <p data-cy={`message-${index}-comment`}><strong>Comment:</strong> {message.comment}</p>
      <p data-cy={`message-${index}-type`}><strong>type:</strong> {message.type}</p>
      <hr />
    </div>
  ))}
</div>

  );
}

export default Message;
