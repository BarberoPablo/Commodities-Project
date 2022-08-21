import React from 'react';
import { useState } from 'react';
//import { useDispatch } from 'react-redux';
//import { searchPosts } from '../../../Redux/Actions/Actions';
import s from './Navbar.module.css'

const Search = () => {
  //const dispatch = useDispatch();
  const [input,setInput] = useState('')

  const handleChange = (e) =>{
    setInput(e.target.value);
  }

    const handleClick = (e) =>{
      if(e.target.innerHTML === 'Buyers'){
        console.log('Buyers', input)
  
      }
      if(e.target.innerHTML === 'Sellers'){
        console.log('Sellers', input)
        
      }
    }

  return (
      <div>
        <input onChange={handleChange} type='text' value={input} />
        <button onClick={handleClick}>Buyers</button>
        <button onClick={handleClick}>Sellers</button>
      </div>
  )
}

export default Search