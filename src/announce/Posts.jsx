import React from "react";
import style from "./Posts.module.css";
import FormatDate from "./FormatDate";
import Skeleton from "react-loading-skeleton"; // 스켈레톤 컴포넌트 import
import "react-loading-skeleton/dist/skeleton.css"; // 스켈레톤 CSS import
import { useNavigate } from "react-router-dom";

const Posts = ({ posts, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        // 로딩 중 스켈레톤 표시
        return (
            <>
                {Array(3) // 5개의 스켈레톤 행을 생성
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
        console.log(announceId);
        navigate(`/announcedetail/${announceId}`);
    };

    // console.log(posts[0].announceCreatedDate);

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
