import React, { useEffect, useState } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import Login from './Login';
import { useChatMembers } from '../context/GetChatMembers';
import Header from './Header';
import LoginHeader from './LoginHeader';
import headerBg from '../assets/images/header-bg.png';
import avatar from '../assets/images/avatar.jpg';
import LoadingScreen from './LoadingScreen';
import ChatMembersHeader from './ChatMembersHeader';
import Footer from './Footer';

import {updateCurrentuser, socket} from '../context/socketHandler'

function ChatMembers() {
  const { userID } = useParams(); 
  const { chatMembers, fetchChatMembers, error } = useChatMembers();

  const [loading, setLoading] = useState(true);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };


  //   socket?.onmessage = (event) => {
  //     // setMessages((prevMessages) => [...prevMessages, formattedMessages]);
  //     const formattedMessages = JSON.parse(event.data)

  // if (formattedMessages.sendId !== userID) {
  //   // if(currentUser === formattedMessages.senderId){
  //     formattedMessages.message = 4
  //     // formattedMessages.senderId
  //     socket.send(JSON.stringify(formattedMessages))
  //   // }
  //   // else{
  //   //   formattedMessages.message = 4
  //   //   socket.send(JSON.stringify(formattedMessages))
  //   // }
  // }
  //   }

  useEffect(() => {
    console.log(chatMembers)
    // Only call fetchChatMembers if we don't already have chatMembers data for the userID
    if (userID) {
      fetchChatMembers(userID);
      updateCurrentuser("")

    }
  }, [userID]); // Adding chatMembers to the dependency array

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!userID) {
    return <Login />;
  }

  return (
    <>
      <header style={{ backgroundImage: `url(${headerBg})` }}>
        <Header />
        <ChatMembersHeader/>
      </header>

      <div className="chatMembers chatWrap">
        {chatMembers.length > 0 ? (
          chatMembers.map((member,index) => {
            console.log(member);
            if (member.receiverId !== '') {
                const memCardClass = index === 0 ? 'memberCard active' : 'memberCard'
              return (
                <>
                <NavLink to={`/chats/${member.senderId === userID ?  member.senderId : member.receiverId }/${member.senderId === userID ? member.receiverId : member.senderId}`}>
                  <div key={member.id} className={memCardClass}  data-sid= {member.senderId} data-rid= {member.receiverId}>
                    <div className="memberCardWrap">
                      <div className="memberCardWrap_img">
                        <img src={avatar} alt="Avatar" />
                      </div>
                      <div className="memberCardWrap_meta">
                        {/* <h5>{member.receiverId}</h5> */}
                        <h5>{member.senderId === userID ? member.receiverId : member.senderId}</h5>
                        <p>{member.senderId === userID ?  member.content + " (sent)" : member.content}</p>
                        {/* <p>{member.senderId === userID ? }</p> */}
                      </div>
                    </div>
                    <div className="memberCard_date">
                      <p>{formatDate(member.timestamp)}</p>
                    </div>
                  </div>
                </NavLink>
                </>
                
              );
            } else {
              return null;
            }
          })
        ) : (
          <li>No chat members found.</li>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default ChatMembers;
