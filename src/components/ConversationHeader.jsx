import React, { useState } from 'react';
import CallIcon from '../assets/images/call-icon.png';
import LeftArrow from '../assets/images/left-arrow.png';
import Avatar from '../assets/images/avatar.jpg';
import callIcon from '../assets/images/call-icon.png';
import { Link, NavLink, useParams } from 'react-router-dom';

function ConversationHeader() {
    //const [name,setName] = useState('');

    const { sid, rid } = useParams();
  return (
    <div className="chatsHeader">
        <div className="chatsHeader_meta">
            <div className="bkIcon">
                <NavLink to={`/chat-members/${sid}`}>
                    <img src={LeftArrow} alt="" />
                </NavLink>
            </div>
            <div className="profileDp">
                <img src={Avatar}  />
            </div>
            <div className="recieverName">
                <p>{rid}</p>
            </div>
        </div>
        <div className="chatsHeader_call">
            <Link to='/'><img src={callIcon} alt="" /></Link>
        </div>
    </div>
  )
}

export default ConversationHeader