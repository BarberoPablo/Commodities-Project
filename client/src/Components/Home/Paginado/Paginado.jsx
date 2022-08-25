import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({
  postPerPage,
  posts,
  paginado,
  setPostPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  function handlePaginado(number) {
    paginado(number);
  }

  function handleClick2(e) {
    if (e.target.value === "prev") {
      setCurrentPage(currentPage - 1);
    }
    if (e.target.value === "next") {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className={s.container}>
      <ul className={s.paginado}>
      {currentPage === 1 ? (
        <div className={s.diva} />
      ) : (
        <button
          className={s.btnpn}
          id="pn"
          value="prev"
          onClick={(e) => handleClick2(e)}
        >
          «{" "}
        </button>
      )}
        {pageNumbers?.map((number) => (
          <li className={s.number} key={number}>
            <p
              onClick={() => handlePaginado(number)}
              className={number === currentPage ? s.numerito : s.notnumerito}
            >
              {number}
            </p>
          </li>
        ))}
      </ul>
      
      {currentPage >= Math.ceil(posts / postPerPage) ? (
        <div className={s.diva} />
      ) : (
        <button
          className={s.btnpn}
          id="pn"
          value="next"
          onClick={(e) => handleClick2(e)}
        >
          »{" "}
        </button>
      )}
    </div>
  );
}