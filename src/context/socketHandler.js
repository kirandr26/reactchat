


// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// const ChatMembersContext = createContext();

// export const useChatMembers = () => useContext(ChatMembersContext);

export var socketStatus = false

export var socket


export var currentUser 


export function updateCurrentuser(user){
    currentUser = user
}
function socketMesseager(){

}

function socketInitiator(userID) {

    if (!socketStatus){
        socket = new WebSocket(`ws://13.233.14.66:3000/ws/${userID}`);
 
        socket.onclose = (event) => {
            console.log('WebSocket is closed now.', event);
            socketStatus = false
            // You can add any code here that you want to run when the WebSocket connection is closed.
        };

        socket.onopen = () => {

            socketStatus = true
            // Create a message object to send
            const message = {
                Message: 1, // Change as needed
                UserId: userID,
                // Add additional fields as required
            };

            // Send the message as a JSON string
            socket.send(JSON.stringify(message));
            // fetchChatMembers();
        };

        socket.onmessage = (event) => {

            console.log(event, " RECEVIED")
            const message = JSON.parse(event.data);

            if (message.purpose === 1) {
                if (message.action === 2) {
                    console.log("ur users opened", message.chatId)

                    // // const messageElement = document.getElementById(message.chatId);
                    // const messageElement = document.getElementById(message.chatId);
                    // if (messageElement) {
                    //     const statusSpan = messageElement.querySelector('#status');
                    //     if (statusSpan) {
                    //         statusSpan.innerHTML = "delivered";
                    //     }
                    // }



                } else if (message.action === 3) {
                    console.log("ur users opened ur conversation")
                    console.log("ur users read ur message", message.chatId)
                    // const messageElement = document.getElementById(message.chatId);
                    // if (messageElement) {
                    //     const statusSpan = messageElement.querySelector('#status');
                    //     if (statusSpan) {
                    //         statusSpan.innerHTML = "read";
                    //     }
                    // } else {
                    //     console.log(message.chatId, " is not found in elements")
                    // }
                }


            } else if (message.action === 5) {

                console.log(message.id, "got editied")
                // const messageElement = document.getElementById(message.id);
                // if (messageElement) {
                //     const statusSpan = messageElement.querySelector('#content');
                //     if (statusSpan) {
                //         statusSpan.innerHTML = message.content + " (Edited)";
                //     }
                // } else {
                //     console.log(message.id, " is not found in elements")
                // }
            }


            else if (message.action === 6) {
                console.log("delte updation")

                // const messageElement = document.getElementById(message.id);
                // if (messageElement) {
                //     const statusSpan = messageElement.querySelector('#content');
                //     if (statusSpan) {
                //         statusSpan.innerHTML = "Deleted";
                //     }
                // } else {
                //     console.log(message.chatId, " is not found in elements")
                // }
            }



            else { // if  (message.action ===  2){
//                     const messageElement = document.createElement('div');
//                     messageElement.id = message.id
//                     messageElement.className = 'mb-2';
//                     messageElement.innerHTML = `
//                                      <p class="text-gray-500 text-sm" >Reply for: (${message.reply ? message.replyOrigin : ""})</p>

//     <strong>${message.senderId === userID ? 'You' : message.senderId}:</strong> <p id="content" style="color:purple"> ${message.action === 5 ? message.content + " (Edited)" : message.action === 6 ? "Deleted" : message.content}</p>
//                 <span class="text-gray-500 text-sm" id="status" > (${message.receiverId === userID ? "" : message.state === 1 ? "sent" : message.state === 2 ? "delivered" : message.state === 3 ? "read" : message.state === 4 ? "deleted" : message.state === 0 ? "s" : "ss"})</span>
//     <span class="text-gray-500 text-sm"> (${new Date(message.timestamp).toLocaleString()})</span>
//         <button onclick="replyToMessage('${message.senderId}', '${message.content}')" class="text-blue-500 ml-2 underline text-sm">Reply</button>
//                 <button onclick="editMessage('${message.id}', '${message.content}')" class="text-green-500 ml-2 underline text-sm"> (${message.receiverId === userID ? "" : "Edit"})</button>


// `;
//                     const messagesDiv = document.getElementById('messages');
//                     messagesDiv.appendChild(messageElement);

                console.log(message.senderId !== userID, " yellow check")
                // if (message.senderId !== userID) {

                //     console.log("t444")

                //     if (currentTarget === message.senderId) {
                //         console.log("t445")

                //         message.message = 3
                //         socket.send(JSON.stringify(message));

                //     } else {
                //         console.log("t446")

                //         message.message = 4
                //         socket.send(JSON.stringify(message));
                //     }



                // }



            }

        };
    }
 
 

        }

export default socketInitiator;
