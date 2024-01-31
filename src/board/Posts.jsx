import React from "react";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    return (
        <>
            {loading && <div> loading... </div>}

            {posts.map((post) => (
                <tr key={post.id}>
                    <td className={style.td}>{post.id}</td>
                    <td>
                        <a href="">{post.title}</a>
                    </td>
                    <td>{post.userId}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
