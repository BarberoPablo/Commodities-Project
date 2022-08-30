import React, { useEffect, useState } from 'react'


const Favorites = ({Fav, setFav}) => {
  
  const handleDelete = ({e}) =>{
    const deletePost = Fav.filter(post=> post.id !== e.id)
    setFav(deletePost)
  }

  return (
    <div>
      {
        Fav?.map((e)=>(
          <div>
            <h1>{e.title}</h1>
            <p>{e.categoryName}</p>
            <button onClick={()=>handleDelete({e})}>x</button>
          </div>
        ))
      }
    </div>
  )
}

export default Favorites