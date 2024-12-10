import React from 'react';
import { Link } from 'react-router-dom';
import connectED from '../assets/images/ConnectED.png';



function Header() {
  return (
    <div className='commonHeader'>
        <div className="logo">
            <Link to='/'>
                <img src={connectED} alt="ConnectED" />
            </Link>
            
        </div>
        
    </div>
  )
}

export default Header