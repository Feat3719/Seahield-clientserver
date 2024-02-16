import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const currentPageGroup = Math.floor((currentPage - 1) / 10);
    const startPage = currentPageGroup * 10 + 1;
    const endPage = Math.min((currentPageGroup + 1) * 10, pageNumbers.length);

    const currentPages = pageNumbers.slice(startPage - 1, endPage);

    return (
        <div id={style.pagination_box}>
            <nav className={style.nav}>
                <div className={style.page_ul}>
                    {startPage > 1 && (
                        <div
                            className={style.page_li}
                            onClick={() => paginate(startPage - 1)}
                        >
                            <div className={style.page_span}>Pre</div>
                        </div>
                    )}
                    {currentPages.map((number) => (
                        <div
                            key={number}
                            className={`${style.page_li} ${
                                number === currentPage
                                    ? style.currentPage
                                    : style.otherPage
                            }`}
                        >
                            <div
                                onClick={() => paginate(number)}
                                className={style.page_span}
                            >
                                {number}
                            </div>
                        </div>
                    ))}
                    {endPage < pageNumbers.length && (
                        <div
                            className={style.page_li}
                            onClick={() => paginate(endPage + 1)}
                        >
                            <div className={style.page_span}>Next</div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Pagination;
