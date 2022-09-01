import React, { useEffect, useState } from 'react'
import s from './Favorites.module.css'

const Favorites = ({Fav, setFav}) => {
  
  const handleDelete = ({e}) =>{
    const deletePost = Fav.filter(post=> post.id !== e.id)
    setFav(deletePost)
  }

  return (
    <div className={s.container} >
      {
        Fav.length > 0 ?
        Fav?.map((e)=>(
          <div>
            <h1>{e.title}</h1>
            <p>{e.categoryName}</p>
            <button onClick={()=>handleDelete({e})}>x</button>
          </div>
        )):
        <h1>You have no favorites</h1>
      }
    </div>
  )
}

export default Favorites