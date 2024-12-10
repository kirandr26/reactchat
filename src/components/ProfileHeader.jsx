import React from 'react';
import headerBg from '../assets/images/header-bg.png';
import { Link } from 'react-router-dom';
import LeftArrow from '../assets/images/left-arrow.png';

function ProfileHeader() {
  return (
    <header style={{ backgroundImage: `url(${headerBg})` }} className='profileHeader'>
       <Link to="/">
            <div className="bkIcon">
                <img src={LeftArrow}  />
            </div>
       </Link>
    </header>
  )
}

export default ProfileHeader