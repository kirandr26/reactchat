import React from 'react'
import LeftArrow from '../assets/images/left-arrow.png';
import { useNavigate } from 'react-router-dom';

function SearchHeader({ onSearch }) {
    const navigate = useNavigate();
  return (
    <div className="chatsHeader searchHeader">
        <div className="chatsHeader_meta">
            <div className="bkIcon">
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent' }}>
                    <img src={LeftArrow} alt="Back" />
                </button>  
            </div>
            <div className="searchInput">
                <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search here..."
                    onChange={(e) => onSearch(e.target.value)} // Call the onSearch function
                />
            </div>
        </div>
    </div>
  )
}

export default SearchHeader