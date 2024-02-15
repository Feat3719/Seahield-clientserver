import React, { useState, useEffect } from "react";
import style from "./BoardList.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

function BoardList({ category, tabName, userType }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    // const usertype = useSelector((state) => state.auth.usertype);
    // console.log(usertype);

    let showWriteButton = false;
    if (tabName === "자유게시판" || tabName === "질문게시판") {
        showWriteButton = true;
    } else if (tabName === "공지사항" && userType === "ADMIN") {
        showWriteButton = true;
    }

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const response = await axios.get(
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
            <div id={style.tableBox}>
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
            {showWriteButton && (
                <div id={style.buttonBox}>
                    <Link to="/boardwrite">
                        <button className={style.boardlist_btn}>글쓰기</button>
                    </Link>
                </div>
            )}

            <div id={style.paginationBox}>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={setCurrentPage}
                ></Pagination>
            </div>
        </>
    );
}

export default BoardList;
