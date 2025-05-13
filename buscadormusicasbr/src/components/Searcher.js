import React from 'react'
import { Search } from 'react-bootstrap-icons';
import {searchSongs} from "../components/HomePage.js"
import { useState } from 'react';
import '../css/Searcher.css';

export default function Searcher({searcherTopic, onSearch}) {
  const [query, setQuery] = useState('');

   const handleClick = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
        
        <div className="input-group searchInput mx-auto">
            
            <input
              className="form-control searcherInputTag"
              id={`field-${searcherTopic}`}
              placeholder={searcherTopic}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            />
            
            <button type="button" className='btn search-button' onClick={handleClick}>
                <Search color='white' />
            </button>
            
        </div>
        
  )
}
