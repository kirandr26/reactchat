import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ConversationHeader from './ConversationHeader';
import headerBg from '../assets/images/header-bg.png';
import sendIcon from '../assets/images/send-icon.png';
import fileIcon from '../assets/images/pin-icon.png';
import {currentUser, socket, updateCurrentuser} from '../context/socketHandler';

// import {updateCurrentuser, currentUser} from '../context/socketHandler'



// Function to format date as Today, Yesterday, or DD MMM at HH:MM format
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const dateOptions = { day: 'numeric', month: 'short' };

    if (date.toDateString() === today.toDateString()) {
        return `Today at ${date.toLocaleTimeString('en-GB', timeOptions)}`;
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${date.toLocaleTimeString('en-GB', timeOptions)}`;
    }
    return `${date.toLocaleDateString('en-GB', dateOptions)} at ${date.toLocaleTimeString('en-GB', timeOptions)}`;
};

function ChatConversation() {
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(''); 
  const [currentChat, setCurrentChat] = useState('');
  
  // const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);

  const { sid, rid } = useParams();
  const chatContainerRef = useRef(null);
  console.log(currentUser, "current chat member")



  
  socket.onmessage = (event) => {


//setM
const formattedMessages = JSON.parse(event.data)
console.log(formattedMessages, " IMP")
if (formattedMessages.purpose === 1){

  if (formattedMessages.action === 2){
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === formattedMessages.chatId ? { ...message, state: "deliveredfuy" } : message
      )
    );
  }
  else if(formattedMessages.action === 3){
    console.log("read update")
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === formattedMessages.chatId ? { ...message, state: "readivy" } : message
      )
    );
    
  }

 

}else{
  setMessages((prevMessages) => [...prevMessages, formattedMessages]);

  if (formattedMessages.sendId !== sid) {
    if(currentUser === formattedMessages.senderId){
      formattedMessages.message = 3
      // formattedMessages.senderId
      socket.send(JSON.stringify(formattedMessages))
    }
    else{
      formattedMessages.message = 4
      socket.send(JSON.stringify(formattedMessages))
    }
  }



}

// if (currentChat)

// if (formattedMessages.SenderId === )
// response.data.data.reverse().map((item) => ({
//   chatID: item.id,
//   state:
//     item.receiverId === userID
//       ? ''
//       : item.state === 1
//       ? 'sent'
//       : item.state === 2
//       ? 'delivered'
//       : item.state === 3
//       ? 'read'
//       : item.state === 4
//       ? 'deleted'
//       : item.state === 0
//       ? 's'
//       : 'ss',
//   senderId: item.senderId,
//   content: item.content,
//   timestamp: item.timestamp,
//   receiverId: item.receiverId,
//   mediaData: item.mediaData,
//   mediaName: item.mediaName,
//   type: item.type,
// }));
// setMessages(formattedMessages);


  }


  useEffect(() => {
    console.log("Updated Messages:", messages);
 //
  }, [messages])

  useEffect(() => {
    updateChatAfterMessageSent(sid, rid);
    
    const message = {
      message: 2,
      conversationID: rid,
      userId: sid,
    };


    socket.send(JSON.stringify(message));

  }, [rid]);

  const updateChatAfterMessageSent = async (userID, receiverId) => {
    try {

      const response = await axios.get(`http://13.233.14.66:3000/get-member-chats/${userID}/${receiverId}`);
      const formattedMessages = response.data.data.reverse().map((item) => ({
        chatID: item.id,
        state:
          item.receiverId === userID
            ? ''
            : item.state === 1
            ? 'sent'
            : item.state === 2
            ? 'delivered'
            : item.state === 3
            ? 'read'
            : item.state === 4
            ? 'deleted'
            : item.state === 0
            ? 's'
            : 'ss',
        senderId: item.senderId, // === userID ? item.receiveId : item.senderId,
        content: item.content,
        timestamp: item.timestamp,
        receiverId: item.receiverId,
        mediaData: item.mediaData,
        mediaName: item.mediaName,
        type: item.type,
        chatId: item.id
      }));
      setMessages(formattedMessages);
      // setCurrentChat(receiverId);
      updateCurrentuser(receiverId)

    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (event) => {
    const sendId = event.currentTarget.dataset.sid;
    const receiveId = event.currentTarget.dataset.rid;
    console.log(sendId)
    // if (!file) return;
    

    const formData = new FormData();
    formData.append('senderId', sendId);
    formData.append('receiverId', receiveId);
    formData.append('content', message);
    formData.append('type', file ? 'media' : 'text');
    if (message.trim()) {
      formData.append('content', message);
    }
  
    formData.append('type', file ? 'media' : 'text');
  
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://13.233.14.66:3000/messages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        setMessage('');
        setFile(null);
        // updateChatAfterMessageSent(sid, rid);
      } else {
        console.log('show timer or message not sent alert!');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      <header style={{ backgroundImage: `url(${headerBg})` }}>
        <ConversationHeader />
      </header>
      <div className="conversions" ref={chatContainerRef}>
        {messages.map((item, index) => {
          const isSender = item.senderId === sid;
          const senderClass = isSender ? 'floatRight' : '';
          const showText = item.content ? <p>{item.content}</p> : null;
          const mediaTextClass = item.content ? 'mediaWithText' : '';

          if (item.type === 'media' && item.mediaName && item.mediaData) {
            const extension = item.mediaName.split('.').pop().toLowerCase();
            const mediaContent = (
              ['png', 'jpeg', 'jpg', 'gif'].includes(extension) ? (
                <img src={`data:image/${extension};base64,${item.mediaData}`} alt={item.mediaName} />
              ) : extension === 'mp4' ? (
                <video controls autoPlay muted>
                  <source src={`data:video/mp4;base64,${item.mediaData}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a href={`data:application/octet-stream;base64,${item.mediaData}`} download={item.mediaName} className="text-blue-500">
                  Download {item.mediaName}
                </a>
              )
            );

            return (
              <div className={`messageCard ${senderClass} mediaWrap`} data-uid={item.senderId} key={index}>
                <div className={`messageCard_content ${mediaTextClass}`}>
                  <small>{formatDate(item.timestamp)}</small>
                  <div className="chatCnt">
                    {showText}
                    {mediaContent}
                  </div>
                  <i id={item.chatID} className="messStatus">{item.state}</i>
                </div>
              </div>
            );
          }

          return (
            <div className={`messageCard ${senderClass}`} data-uid={item.senderId} key={index}>
              <div className="messageCard_content">
                <small>{formatDate(item.timestamp)}</small>
                <div className="chatCnt">{showText}</div>
                <i id={item.chatID} className="messStatus">{ item.receiveId !== sid ? item.state : ""}</i>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatTextBox">
      {file && (
          <div className="filesWrap">
              <p>{file.name}</p>
              <button type="button" className="closeFileBtn" onClick={removeFile}>&times;</button>
          </div>
      )}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="formInput">
            <input
              type="text"
              name="txtMessage"
              id="txtMessage"
              className="chatInput"
              placeholder="Write a message..."
              value={message}
              autoComplete='off'
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="fileWrap">
              <input
                type="file"
                name="chatFileInput"
                className="chatFileInput"
                id="chatFileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="pinIcon" onClick={() => document.getElementById('chatFileInput').click()}>
                <img src={fileIcon} alt="File" />
              </div>
            </div>
          </div>
          <button type="button" className="sendBtn" data-sid={sid} data-rid={rid} onClick={handleSendMessage}>
            <img src={sendIcon} alt="Send" />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatConversation;
