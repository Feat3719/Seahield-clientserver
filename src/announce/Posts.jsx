import React from "react";
import style from "./Posts.module.css";
import FormatDate from "./FormatDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Posts = ({ posts, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <>
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <tr key={index}>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                            <td>
                                <Skeleton className={style.skeleton_shimmer} />
                            </td>
                        </tr>
                    ))}
            </>
        );
    }

    const handleRowClick = (announceId) => {
        navigate(`/announcedetail/${announceId}`);
    };

    return (
        <>
            {posts.map((post) => (
                <tr
                    key={post.announceId}
                    onClick={() => handleRowClick(post.announceId)}
                    className={style.row}
                >
                    <td className={style.article_no}>{post.announceId}</td>
                    <td className={style.article_title}>{post.announceName}</td>
                    <td className={style.article_date}>
                        {FormatDate(post.announceCreatedDate)}
                    </td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
