import React from "react";
import { Link } from "react-router-dom";
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    console.log(posts);

    return (
        <>
            {loading && <div> loading... </div>}

            {posts.map((post) => (
                <tr key={post.qnaArticleId}>
                    <td className={style.article_no}>{post.qnaArticleId}</td>
                    <td>
                        <Link to={`/boarddetail/${post.qnaArticleId}`}>
                            {post.qnaArticleTitle}
                        </Link>
                        {/* <Link
                            to={{
                                pathname: "/boarddetail",
                                state: { post: post },
                            }}
                        >
                            {post.qnaArticleTitle}
                        </Link> */}
                    </td>
                    <td className={style.article_user}>{post.userId}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
