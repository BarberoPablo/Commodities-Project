import React from 'react'
import { useState } from 'react'

const Search = () => {

  const [input,setInput] = useState('')

  const handleChange = (e) =>{
    setInput('')
  }

    const handleSubmit = () =>{
    }

  return (
      <form onSubmit={handleSubmit} >
        <input onChange={handleChange} type='text' value={input} />
      <button type='submit' >Buyers</button>
      <button type='submit' >Suppliers</button>
      </form>
  )
}

export default Search