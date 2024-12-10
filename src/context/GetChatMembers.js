import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import socketInitiator from './socketHandler';

const ChatMembersContext = createContext();

export const useChatMembers = () => useContext(ChatMembersContext);

function GetChatMembers({ children }) {
  const [chatMembers, setChatMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatMembers = async (userID) => {
    socketInitiator(userID)
    console.log("see me")
    try {
      setLoading(true);
      const response = await axios.get(`http://13.233.14.66:3000/get-chat-members/${userID}`);
      // console.log(response.data.data)
      setChatMembers(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatMembersContext.Provider value={{ chatMembers, fetchChatMembers, loading, error }}>
      {children}
    </ChatMembersContext.Provider>
  );
}

export default GetChatMembers;
