import React from 'react';
import headerBg from '../assets/images/header-bg.png';

function AlertsHeader() {
  return (
    <header style={{ backgroundImage: `url(${headerBg})` }}>
        <div className="alertHeaderWrap">
            <p>Alerts</p>
            <p className='smallTxt'>Mark all read</p>
        </div>
    </header>
  )
}

export default AlertsHeader