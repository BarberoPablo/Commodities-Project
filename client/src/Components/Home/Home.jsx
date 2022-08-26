import {React, useEffect, useState }  from 'react'
//import Navbar from './Navbar/Navbar'
import DrawerCategories from './DrawerCategories/DrawerCategories'
import {useDispatch, useSelector} from 'react-redux'
import { getPost, getCategoriesByName, getUserDetails} from '../../Redux/Actions/Actions'
import Cards from './Card/Cards'
import Paginado from "./Paginado/Paginado"
import s from './Home.module.css'
import PaypalCheckoutButton from './PaypalCheckoutButton'
import Filters from './Filters/Filters'
import { useAuth0 } from "@auth0/auth0-react";

const Home = ({currentPage, setCurrentPage}) => {
  const product = {
    planName: "Premium",
    price: 10
  };

  const dispatch = useDispatch()
  const {allCategories} = useSelector(state => state.categories)
  const {posts} = useSelector(state=>state.posts)
  const { user } = useAuth0();
  
  useEffect(()=>{
    dispatch(getPost())
    dispatch(getCategoriesByName())
    if(user){
       dispatch(getUserDetails(user.email))
    }
  },[dispatch, user])

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
      <Filters setCurrentPage={setCurrentPage}/>
      </div>
      {}
      <Paginado
          setPostPerPage={setPostPerPage}
          setCurrentPage={setCurrentPage}
          postPerPage={postPerPage}
          posts={posts.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      {/* more components in HOME */}

     <div className="paypal-button-conteiner">
      <PaypalCheckoutButton 
        product={product} 
      />
     </div>
    </div>
  )
}
export default Home;
