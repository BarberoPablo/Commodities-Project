import React from 'react'
import Navbar from './Navbar/Navbar'
import DrawerCategories from './DrawerCategories/DrawerCategories'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getPost } from '../../Redux/Actions/Actions'

const Home = () => {

  const dispatch = useDispatch()
  const {posts} = useSelector(state=>state.posts)

  useEffect(()=>{
    dispatch(getPost())
  },[])

  return (
    <div style={{display:'flex'}}>
      <DrawerCategories />
      {/* more components in HOME */}
    </div>
  )
}

export default Home