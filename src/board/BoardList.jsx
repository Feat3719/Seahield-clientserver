import React, { useState, useEffect } from "react";
import style from "./BoardList.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function BoardList({ category, tabName, userType }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

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
            const sortedPosts = response.data.sort((a, b) =>
                // b.articleCreatedDate - a.articleCreatedDate
                {
                    // 배열을 Date 객체로 변환합니다.
                    const dateA = new Date(...a.articleCreatedDate);
                    const dateB = new Date(...b.articleCreatedDate);

                    // 유닉스 타임스탬프를 이용하여 비교합니다.
                    return dateB.getTime() - dateA.getTime();
                }
            );
            setPosts(sortedPosts);
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
                            <td className={style.article_date}>작성 날짜</td>
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
                    <Link to={"/boardwrite"}>
                        <button className={style.boardlist_btn}>글쓰기</button>
                    </Link>
                </div>
            )}

            <div id={style.paginationBox}>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </div>
        </>
    );
}

export default BoardList;
