import { React, useEffect, useState } from "react";
import DrawerCategories from "./DrawerCategories/DrawerCategories";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  getCategoriesByName,
  getUser,
} from "../../Redux/Actions/Actions";
import Cards from "./Card/Cards";
import Paginado from "./Paginado/Paginado";
import s from "./Home.module.css";
import Filters from "./Filters/Filters";

const Home = ({ currentPage, setCurrentPage, setFav, Fav }) => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.categories);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getCategoriesByName());
    dispatch(getUser());
  }, [dispatch]);

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
          {posts.length > 0 ? (
            <Cards currentPost={currentPost} setFav={setFav} Fav={Fav} />
          ) : null}
        </div>
      </div>

      {posts.length > 0 ? (
        <Paginado
          setPostPerPage={setPostPerPage}
          setCurrentPage={setCurrentPage}
          postPerPage={postPerPage}
          posts={posts.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      ) : null}
      {/* more components in HOME */}
    </div>
  );
};
export default Home;
