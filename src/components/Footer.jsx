import React from 'react';
import { Link } from 'react-router-dom';
import direct from '../assets/images/direct.png'
import groups from '../assets/images/groups.png'
import calls from '../assets/images/calls.png'
import notifications from '../assets/images/notifications.png'

function Footer() {
  return (
    <>
        <footer>
            <div className="menus">
                <ul>
                    <li><Link to="/"><img src={direct} alt="" /><span>Direct</span></Link></li>
                    <li><Link to="/"><img src={groups} alt="" /><span>Groups</span></Link></li>
                    <li><Link to="/"><img src={calls} alt="" /><span>Calls</span></Link></li>
                    <li><Link to="/notifications"><img src={notifications} alt="" /><span>Alerts</span></Link></li>
                </ul>
            </div>
        </footer>
    </>
  )
}

export default Footer