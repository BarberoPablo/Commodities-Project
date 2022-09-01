import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({
  postPerPage,
  posts,
  paginado,
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
    <div className={s.Container}>
      {currentPage === 1 ? null : (
        <button
          className={s.btn}
          id="pn"
          value="prev"
          onClick={(e) => handleClick2(e)}
        >
          «{" "}
        </button>
      )}
      <div className={s.container}>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <a
              onClick={() => handlePaginado(number)}
              className={number === currentPage && s.number}
            >
              {number}
            </a>
          </li>
        ))}
      </div>
      {currentPage >= Math.ceil(posts / postPerPage) ? null : (
        <button
          className={s.btn}
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
