import {React, useEffect }  from 'react'
import DrawerCategories from './DrawerCategories/DrawerCategories'
import {useDispatch, useSelector} from 'react-redux'
import { getPost } from '../../Redux/Actions/Actions'
import Cards from './Card/Cards'
import { getCategoriesByName } from "../../Redux/Actions/Actions";

const Home = () => {

  const dispatch = useDispatch()
  const {allCategories} = useSelector(state => state.categories)
  const {posts} = useSelector(state=>state.posts)


  useEffect(()=>{
    dispatch(getPost())
    dispatch(getCategoriesByName())
  },[dispatch])

  return (
    <div style={{display:'flex'}}>
      <DrawerCategories allCategories={allCategories} />
      <Cards posts={posts} />
      {/* more components in HOME */}
    </div>
  )
}

export default Home