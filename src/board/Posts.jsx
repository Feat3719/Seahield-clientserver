import React from "react";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    return (
        <>
            {loading && <div> loading... </div>}

            {posts.map((post) => (
                <tr key={post.id}>
                    <td className={style.article_no}>{post.id}</td>
                    <td>
                        <a href="">{post.title}</a>
                    </td>
                    <td className={style.article_user}>{post.userId}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
