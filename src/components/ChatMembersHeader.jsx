import React from 'react'
import searchIcon from '../assets/images/seach-icon.png'
import dots from '../assets/images/three-dots.png'
import { NavLink } from 'react-router-dom'
function ChatMembersHeader() {
  return (
    <div className="cmMenu">
        <div className="cmMenu_search">
          <NavLink to='/search'><img src={searchIcon}/></NavLink>
        </div>
        <div className="cmMenu_links">
            <img src={dots} />
        </div>
    </div>
  )
}

export default ChatMembersHeader