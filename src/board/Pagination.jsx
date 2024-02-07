import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div id={style.pagination_box}>
            <nav className={style.nav}>
                <div className={style.page_ul}>
                    {pageNumbers.map((number) => (
                        <div key={number} className={style.page_li}>
                            <div
                                onClick={() => paginate(number)}
                                className={style.page_span}
                            >
                                {number}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Pagination;
