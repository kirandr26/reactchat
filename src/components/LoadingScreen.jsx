import React from 'react';
import lodingBg from '../assets/images/loading-bg.png'
import logo from '../assets/images/connectEd-logo.png'
import logoIcon from '../assets/images/tech-edi.png'

function LoadingScreen() {
  return (
    <div className="loadingScreen" style={{backgroundImage:`url(${lodingBg})`}}>
        <div className="loadingScreen_logo">
            <img src={logo} alt="connectED" />
        </div>
        <div className="loadingScreen_footer">
            <p>Powered by <img src={logoIcon} alt="" /> Techedilite</p>
        </div>
    </div>
  )
}   

export default LoadingScreen