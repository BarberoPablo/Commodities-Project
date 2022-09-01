import { React, useEffect, useState } from "react";
import DrawerCategories from "./DrawerCategories/DrawerCategories";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getCategoriesByName, getUserDetails, getUser, getProfileDetails } from "../../Redux/Actions/Actions";
import Cards from "./Card/Cards";
import Paginado from "./Paginado/Paginado";
import s from "./Home.module.css";
import Filters from "./Filters/Filters";
import { useAuth0 } from "@auth0/auth0-react";


const Home = ({ currentPage, setCurrentPage, setFav, Fav }) => {

  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.categories);
  const { posts } = useSelector((state) => state.posts);
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getPost());
    dispatch(getCategoriesByName());
    dispatch(getUser())
    if (user) {
      dispatch(getUserDetails(user.email));
    }
  }, [dispatch, user]);

  //paginado
  //pagina actual
  const [postPerPage, setPostPerPage] = useState(4); //cantidad de cards por paginas
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={s.container}>
      <div className={s.container_home}>
        <DrawerCategories
          allCategories={allCategories}
          setCurrentPage={setCurrentPage}
        />
        <div className={s.container_filters}>
          <Filters setCurrentPage={setCurrentPage} />
          <Cards currentPost={currentPost} setFav={setFav} Fav={Fav} />
          {/* more components in HOME */}
          {
            posts.length ? 
            <Paginado
              setPostPerPage={setPostPerPage}
              setCurrentPage={setCurrentPage}
              postPerPage={postPerPage}
              posts={posts.length}
              paginado={paginado}
              currentPage={currentPage}
            />
            :null
          }
        </div>
      </div>
    </div>
  );
};
export default Home;
