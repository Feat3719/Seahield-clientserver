import React, { useState, useEffect } from "react";
import style from "./AnnounceList.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "../board/Pagination";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

function AnnounceList({ category, tabName, userType }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    // const [showWriteButton, setShowWriteButton] = useState(false);
    // const usertype = useSelector((state) => state.auth.usertype);
    // console.log(usertype);

    // useEffect(() => {
    //     if (userType === "ADMIN") {
    //         setShowWriteButton(true);
    //     }
    // });

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const response = await axios.get("/api/announce/in-apply");

            if (response.status === 200) {
                setPosts(response.data);
                setLoading(false);
            } else if (response.status === 404) {
                console.error("요청이 실패했습니다.");
            }
        };
        fetchPost();
    }, []);

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
                            <td className={style.announce_no}>번호</td>
                            <td className={style.announce_name}>제목</td>
                            <td className={style.announce_created_date}>
                                게시일
                            </td>
                            {/* <td className={style.bidding_start_date}>
                                입찰시작
                            </td>
                            <td className={style.bidding_end_date}>입찰종료</td> */}
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
            {/* {showWriteButton && (
                <div id={style.buttonBox}>
                    <Link to="/boardwrite">
                        <button className={style.button}>공고작성</button>
                    </Link>
                </div>
            )} */}

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

export default AnnounceList;
