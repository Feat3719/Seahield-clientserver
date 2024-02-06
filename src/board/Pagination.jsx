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

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "../styles/scss/pagination.module.scss";

// interface Props {
//     totalItems: number;
//     itemCountPerPage: number;
//     pageCount: number;
//     currentPage: number;
// }

// export default function Pagination({
//     totalItems,
//     itemCountPerPage,
//     pageCount,
//     currentPage,
// }: Props) {
//     const totalPages = Math.ceil(totalItems / itemCountPerPage);
//     const [start, setStart] = useState(1);
//     const noPrev = start === 1;
//     const noNext = start + pageCount - 1 >= totalPages;

//     useEffect(() => {
//         if (currentPage === start + pageCount)
//             setStart((prev) => prev + pageCount);
//         if (currentPage < start) setStart((prev) => prev - pageCount);
//     }, [currentPage, pageCount, start]);

//     return (
//         <div className={styles.wrapper}>
//             <ul>
//                 <li className={`${styles.move} ${noPrev && styles.invisible}`}>
//                     <Link to={`?page=${start - 1}`}>이전</Link>
//                 </li>
//                 {[...Array(pageCount)].map((a, i) => (
//                     <>
//                         {start + i <= totalPages && (
//                             <li key={i}>
//                                 <Link
//                                     className={`${styles.page} ${
//                                         currentPage === start + i &&
//                                         styles.active
//                                     }`}
//                                     to={`?page=${start + i}`}
//                                 >
//                                     {start + i}
//                                 </Link>
//                             </li>
//                         )}
//                     </>
//                 ))}
//                 <li className={`${styles.move} ${noNext && styles.invisible}`}>
//                     <Link to={`?page=${start + pageCount}`}>다음</Link>
//                 </li>
//             </ul>
//         </div>
//     );
// }
