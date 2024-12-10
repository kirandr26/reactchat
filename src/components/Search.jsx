import React,{useState} from 'react'
import SearchHeader from './SearchHeader';
import headerBg from '../assets/images/header-bg.png';


function Search() {
    const [searchQuery, setSearchQuery] = useState(''); 
    const [results, setResults] = useState([]); 
    const demoData = [
        { name: 'Alex', rollNo: '18U07ALEX', class: '08', section: 'A' },
        { name: 'Sophia', rollNo: '18U07SOPH', class: '08', section: 'B' },
        { name: 'Jacob', rollNo: '18U07JACO', class: '09', section: 'A' },
        { name: 'Mia', rollNo: '18U07MIA', class: '07', section: 'C' },
        { name: 'Liam', rollNo: '18U07LIAM', class: '08', section: 'D' },
        { name: 'Emma', rollNo: '18U07EMMA', class: '10', section: 'A' },
        { name: 'Noah', rollNo: '18U07NOAH', class: '09', section: 'B' },
    ];
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
          // Filter the demo data based on any attribute (name, rollNo, class, or section)
          const filteredResults = demoData.filter((item) =>
            Object.values(item).some((value) =>
              value.toLowerCase().includes(query.toLowerCase())
            )
          );
          setResults(filteredResults);
        } else {
          setResults([]); // Clear results if the query is empty
        }
      };
  return (
   <>
    <header style={{ backgroundImage: `url(${headerBg})` }}>
        <SearchHeader onSearch={handleSearch}/>
    </header>
    <div className="searchResults">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <div className="liDiv">
                    <p className='name'>{result.name} </p>
                    <p>Class - {result.class}</p>
                </div>
                <div className="liDiv">
                    <p>{result.rollNo}</p>
                    <p>Section - {result.section}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : searchQuery ? (
         
          <div className='typeScreen'>
            <p>No results found</p>
          </div>
        ) : (
          <div className='typeScreen'>
                <p>Type something to search...</p>
          </div>
        )}
    </div>
   </>
  )
}

export default Search