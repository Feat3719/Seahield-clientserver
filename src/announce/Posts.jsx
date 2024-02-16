import React from "react";
import { Link } from "react-router-dom";
import style from "./Posts.module.css";
import FormatDate from "./FormatDatetime";

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
                <tr key={post.announceId}>
                    <td className={style.article_no}>{post.announceId}</td>
                    <td>
                        <Link
                            to={`/announcedetail/${post.announceId}`}
                            className={style.link}
                        >
                            {post.announceName}
                        </Link>
                    </td>
                    <td className={style.article_date}>
                        {FormatDate(post.announceCreatedDate)}
                    </td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
