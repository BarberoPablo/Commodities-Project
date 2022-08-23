import {React, useEffect }  from 'react'
import Navbar from './Navbar/Navbar'
import DrawerCategories from './DrawerCategories/DrawerCategories'
import {useDispatch, useSelector} from 'react-redux'
import { getPost } from '../../Redux/Actions/Actions'
import Cards from './Card/Cards'
const Home = () => {

  const dispatch = useDispatch()
  const {posts} = useSelector(state=>state.posts)
  useEffect(()=>{
    dispatch(getPost())
  },[dispatch])

  return (
    <div style={{display:'flex'}}>
      <DrawerCategories />
      <Cards posts={posts} />
      {/* more components in HOME */}
    </div>
  )
}

export default Home