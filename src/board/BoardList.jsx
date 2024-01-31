import React, { useState, useEffect } from "react";
import style from "./BoardList.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";

function Board() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setPosts(response.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    console.log(posts);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    return (
        <div className={style.middle_section}>
            <div className={style.table_padging}>
                <div className="list">
                    <div className={style.title}>게시판 목록</div>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                <th>No.</th>
                                <th>제목</th>
                                <th>업체ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Posts
                                posts={currentPosts(posts)}
                                loading={loading}
                            ></Posts>
                        </tbody>
                    </table>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={setCurrentPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
}

export default Board;
