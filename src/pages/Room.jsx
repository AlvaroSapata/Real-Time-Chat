import React, { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../../appwriteConfig";

import { ID, Query } from "appwrite";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );

    // Ordenar los documentos de más reciente a más viejo
    const sortedMessages = response.documents.sort((a, b) => {
      const dateA = new Date(a.$createdAt);
      const dateB = new Date(b.$createdAt);
      return dateB - dateA; // Orden descendente (más reciente a más viejo)
    });

    // Limitar los mensajes a los últimos 5
    const lastFiveMessages = sortedMessages.slice(0, 5);

    console.log(lastFiveMessages); // Solo para verificar en la consola

    setMessages(lastFiveMessages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { body: messageBody };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log("Created!", response);

    setMessages((prevState) => [response, ...messages.slice(0, 4)]);

    setMessageBody("");
  };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message-form">
          <div>
            <textarea
              required
              maxLength={1000}
              placeholder="Say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message-header">
                <small className="message-timestamp">
                  {message.$createdAt}
                </small>
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
