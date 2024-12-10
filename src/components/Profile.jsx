import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import profile from '../assets/images/profile.png';

function Profile() {
  
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="profile">
        <ProfileHeader />
        <div className="profile_img">
          <img src={profile} alt="Profile" />
        </div>
        <div className="profile_info">
          <div className="inputWrap">
            <label htmlFor="name">Name</label>
            <p className="formInput">Julie</p>
          </div>
          <div className="inputWrap">
            <label htmlFor="register-id">Register ID</label>
            <p className="formInput">18U07Julie</p>
          </div>
          <div className="inputWrap">
            <label htmlFor="class">Class</label>
            <p className="formInput">8th - B</p>
          </div>
          <div className="inputWrap">
            <label htmlFor="faculty-name">Faculty Name</label>
            <p className="formInput">Maximus</p>
          </div>
          <div className="inputWrap">
            <label htmlFor="emergency-contact">Emergency Contact Number</label>
            <p className="formInput">+91 89282 82043</p>
          </div>
          <div className="inputWrap">
            <label htmlFor="password">Update password</label>
            <div className="iconInputWrap">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="formInput"
                value="Password"
                readOnly
              />
              <i
                className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePassword}
              />
            </div>
          </div>
          <div className="inputWrap btnWrap">
            <button type="button" className="commonBtn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
