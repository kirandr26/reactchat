import React,{useState} from 'react';
import Header from './Header';
import LoginHeader from './LoginHeader';
import headerBg from '../assets/images/header-bg.png';
import {Link} from 'react-router-dom';


function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
      <div className="loginScreen">
        <header style={{backgroundImage: `url(${headerBg})`}}>
          <Header/>
          <LoginHeader/>
        </header>
        
        <div className="chatWrap loginWrap">
            <div className="loginTxt">
                <h3>Welcome!</h3>
                <p>Please login with your credentials</p>
            </div>
            <div className="logInForm">
                <div className="inputWrap">
                    <input type="email" name="loginEmail" id="loginEmail" className="loginEmail" placeholder='Email'/>
                </div>
                <div className="inputWrap mb-0">
                  <div className="iconInputWrap">
                    <input type={passwordVisible ? 'text' : 'password'} name="loginPassword" id="loginPassword" className="loginPassword" placeholder='Password'/>
                    <i
                      className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={togglePassword}
                    />
                  </div>
                  
                </div>
                <div className="forgotPassLink">
                  <Link to='javascript:void(0)'>Forgot Password?</Link>
                </div>
                <div className="inputWrap btnWrap">
                    <button type="button" className='commonBtn'>Continue</button>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Login