import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPageNumber = Math.min(
        currentPage * 10,
        pageNumbers.length
    );
    const indexOfFirstPageNumber = indexOfLastPageNumber - 9;

    const currentPages = pageNumbers.slice(
        indexOfFirstPageNumber - 1,
        indexOfLastPageNumber
    );

    //     return (
    //         <div id={style.pagination_box}>
    //             <nav className={style.nav}>
    //                 <div className={style.page_ul}>
    //                     {pageNumbers.map((number) => (
    //                         <div key={number} className={style.page_li}>
    //                             <div
    //                                 onClick={() => paginate(number)}
    //                                 className={style.page_span}
    //                             >
    //                                 {number}
    //                             </div>
    //                         </div>
    //                     ))}
    //                 </div>
    //             </nav>
    //         </div>
    //     );
    // };

    return (
        <div id={style.pagination_box}>
            <nav className={style.nav}>
                <div className={style.page_ul}>
                    {currentPage > 10 && (
                        <div
                            className={style.page_li}
                            onClick={() => paginate(currentPage - 10)}
                        >
                            <div className={style.page_span}>Pre</div>
                        </div>
                    )}
                    {currentPages.map((number) => (
                        <div
                            key={number}
                            className={`${style.page_li} ${number === currentPage ? style.currentPage : style.otherPage}`}
                        >
                            <div
                                onClick={() => paginate(number)}
                                className={style.page_span}
                            >
                                {number}
                            </div>
                        </div>
                    ))}
                    {pageNumbers.length > indexOfLastPageNumber && (
                        <div
                            className={style.page_li}
                            onClick={() => paginate(currentPage + 10)}
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
