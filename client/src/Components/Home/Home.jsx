import {React, useEffect, useState }  from 'react'
//import Navbar from './Navbar/Navbar'
import DrawerCategories from './DrawerCategories/DrawerCategories'
import {useDispatch, useSelector} from 'react-redux'
import { getPost, getCategoriesByName} from '../../Redux/Actions/Actions'
import Cards from './Card/Cards'
import Paginado from "./Paginado/Paginado"
import s from './Home.module.css'

const Home = ({currentPage, setCurrentPage}) => {
  const dispatch = useDispatch()
  const {allCategories} = useSelector(state => state.categories)
  const {posts} = useSelector(state=>state.posts)
  
  useEffect(()=>{
    dispatch(getPost())
    dispatch(getCategoriesByName())
  },[dispatch])

//paginado
 //pagina actual
const [postPerPage, setPostPerPage] = useState(3); //cantidad de cards por paginas
const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPost = posts.slice(
  indexOfFirstPost,
  indexOfLastPost
);

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  return (
    <div>
    <div className={s.container}>
      <DrawerCategories allCategories={allCategories} setCurrentPage={setCurrentPage}/>
      <Cards currentPost={currentPost} />
      </div>
      <Paginado
          setPostPerPage={setPostPerPage}
          setCurrentPage={setCurrentPage}
          postPerPage={postPerPage}
          posts={posts.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      {/* more components in HOME */}
    </div>
  )
}

export default Home;
