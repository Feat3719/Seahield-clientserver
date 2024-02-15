import React from "react";
import { Link } from "react-router-dom";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    console.log(posts);

    if (loading) {
        return (
            <tr>
                <td colSpan="3">loading...</td>
            </tr>
        );
    }

    return (
        <>
            {posts.map((post) => (
                <tr key={post.articleId}>
                    <td className={style.article_no}>{post.articleId}</td>
                    <td>
                        <Link
                            to={`/boarddetail/${post.articleId}`}
                            className={style.link}
                        >
                            {post.articleTitle}
                        </Link>
                    </td>
                    <td className={style.article_user}>{post.userId}</td>
                    <td className={style.article_reads}>
                        {post.articleViewCounts}
                    </td>
                    <td className={style.article_like}>{post.articleLikes}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
