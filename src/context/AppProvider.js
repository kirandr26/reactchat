
import React from 'react';
import GetChatMembers from './GetChatMembers';


export const AppProvider = ({ children }) => {
  return (
    <GetChatMembers>
        {children}
    </GetChatMembers>
  );
};
