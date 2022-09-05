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
      <nav className={s.container}>
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
        {pageNumbers?.map((number) => (
          <span key={number}>
            <button 
              onClick={() => handlePaginado(number)}
              className={number === currentPage ? s.number : s.number2}
            >
              {number}
            </button>
          </span>
        ))}      
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
      </nav>
      </div>
    </div>
  );
}
