import React from "react";
import { Link } from "react-router-dom";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    console.log(posts);

    return (
        <>
            {loading && <div> loading... </div>}

            {posts.map((post) => (
                <tr key={post.articleId}>
                    <td className={style.article_no}>{post.articleId}</td>
                    <td>
                        <Link to={`/boarddetail/${post.articleId}`}>
                            {post.articleTitle}
                        </Link>
                    </td>
                    <td className={style.article_user}>{post.articleWriter}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
