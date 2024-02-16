import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 최대 표시할 페이지 번호 수
    const maxPageNumberLimit = 10;
    const minPageNumberLimit = 0;

    return (
        <div id={style.pagination_box}>
            <nav className={style.nav}>
                <ul className={style.page_ul}>
                    <li className={style.page_li} onClick={() => paginate(1)}>
                        {"<<"}
                    </li>
                    <li
                        className={style.page_li}
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    >
                        {"<"}
                    </li>
                    {pageNumbers.map((number) => (
                        number <= maxPageNumberLimit + minPageNumberLimit &&
                        number > minPageNumberLimit && (
                            <li
                                key={number}
                                onClick={() => paginate(number)}
                                className={`${style.page_li} ${currentPage === number ? style.active : ''}`} // 현재 페이지일 경우 active 클래스 적용
                            >
                                {number}
                            </li>
                        )
                    ))}
                    <li
                        className={style.page_li}
                        onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                    >
                        {">"}
                    </li>
                    <li className={style.page_li} onClick={() => paginate(pageNumbers.length)}>
                        {">>"}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
