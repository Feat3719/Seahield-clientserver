import React from "react";
import { Link } from "react-router-dom";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    return (
        <>
            {loading && <div> loading... </div>}

            {posts.map((post) => (
                <tr key={post.qnaBoardId}>
                    <td className={style.article_no}>{post.qnaBoardId}</td>
                    <td>
                        <Link to={`/boarddetail/${post.qnaBoardId}`}>
                            {post.qnaBoardTitle}
                        </Link>
                    </td>
                    <td className={style.article_user}>
                        {post.qnaBoardWriter}
                    </td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
