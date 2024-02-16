import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // 스켈레톤 컴포넌트 import
import "react-loading-skeleton/dist/skeleton.css"; // 스켈레톤 CSS import
import style from "./Posts.module.css";

const Posts = ({ posts, loading }) => {
    const navigate = useNavigate();

    // 날짜를 포맷하는 함수
    const formatDate = (dateArray) => {
        const date = new Date(Date.UTC(...dateArray));
        return date.toLocaleDateString("ko-KR", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(/(\s오전|\s오후)/, ''); // '오전'과 '오후' 제거
    };

    if (loading) {
        // 로딩 중 스켈레톤 표시
        return (
            <>
                {Array(3) // 5개의 스켈레톤 행을 생성
                    .fill(0)
                    .map((_, index) => (
                        <tr key={index}>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                            <td><Skeleton className={style.skeleton_shimmer} /></td>
                        </tr>
                    ))}
            </>
        );
    }

    const handleRowClick = (articleId) => {
        navigate(`/boarddetail/${articleId}`);
    };

    return (
        <>
            {posts.map((post) => (
                <tr
                    key={post.articleId}
                    onClick={() => handleRowClick(post.articleId)}
                    className={style.row}
                >
                    <td className={style.article_no}>{post.articleId}</td>
                    <td className={style.article_title}>{post.articleTitle}</td>
                    <td className={style.article_user}>{post.userId}</td>
                    <td className={style.article_reads}>{post.articleViewCounts}</td>
                    <td className={style.article_like}>{post.articleLikes}</td>
                    <td className={style.article_date}>{formatDate(post.articleCreatedDate)}</td>
                </tr>
            ))}
        </>
    );
};
export default Posts;
