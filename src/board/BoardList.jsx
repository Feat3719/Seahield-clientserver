import React, { useState, useEffect } from "react";
import style from "./BoardList.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function BoardList({ category, tabName }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const response = await axios.get(
                // `/api/board/articles?page=${currentPage}`
                `/api/board/articles?articleCtgr=${category}`
            );
            setPosts(response.data);
            setLoading(false);
        };
        fetchPost();
    }, [category]);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    return (
        <>
            <div id={style.container}>
                <div id={style.table_box}>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                <td className={style.article_no}>번호</td>
                                <td className={style.article_title}>제목</td>
                                <td className={style.article_user}>작성자</td>
                                <td className={style.article_reads}>조회수</td>
                                <td className={style.article_like}>좋아요</td>
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>
                            <Posts
                                posts={currentPosts(posts)}
                                loading={loading}
                            ></Posts>
                        </tbody>
                    </table>
                </div>
                <div id={style.button_box}>
                    <Link to="/boardwrite">
                        <button className={style.button}>글쓰기</button>
                    </Link>
                </div>
                <div id={style.pagination_box}>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={setCurrentPage}
                    ></Pagination>
                </div>
            </div>
        </>
    );
}

export default BoardList;
