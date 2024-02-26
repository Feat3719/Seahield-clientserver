import React, { useState } from "react";
import style from "./Comment.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import FormatDatetime from "./FormatDatetime";
import Swal from "sweetalert2";
import Loading from "../loading/Loading"; // 로딩 컴포넌트 import

const Comment = ({ comments, fetchPost }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user);
    const sortedComments = [...comments].sort(
        (a, b) => b.commentId - a.commentId
    );

    const [isUpdating, setIsUpdating] = useState({});
    const [updatedContent, setUpdatedContent] = useState(
        comments.reduce((acc, comment) => {
            acc[comment.commentId] = comment.commentContents;
            return acc;
        }, {})
    );
    const [loading, setLoading] = useState({}); // 각 댓글에 대한 로딩 상태

    const handleUpdateStart = (commentId) => {
        setIsUpdating({ ...isUpdating, [commentId]: true }); // 특정 댓글의 수정 상태를 true로 설정
        setUpdatedContent({
            ...updatedContent,
            [commentId]: comments.find(
                (comment) => comment.commentId === commentId
            ).commentContents,
        }); // 현재 댓글 내용으로 업데이트 필드 설정
    };

    const handleUpdateSubmit = async (commentId) => {
        if (!updatedContent[commentId]) return; // 빈 내용으로의 업데이트 방지
        setLoading((prev) => ({ ...prev, [commentId]: true })); // 로딩 시작
        try {
            await axios.patch(
                `/api/board/comment/${commentId}`,
                {
                    commentContents: updatedContent[commentId],
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            fetchPost(); // 댓글 목록을 최신 상태로 업데이트
            setIsUpdating({ ...isUpdating, [commentId]: false }); // 수정 상태 해제
            setUpdatedContent({ ...updatedContent, [commentId]: "" }); // 업데이트 필드 초기화
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading((prev) => ({ ...prev, [commentId]: false })); // 로딩 종료
        }
    };

    const handleDelete = async (commentId) => {
        Swal.fire({
            title: "정말 삭제하시겠습니까?",
            text: "이 작업은 되돌릴 수 없습니다!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading((prev) => ({ ...prev, [commentId]: true })); // 로딩 시작
                try {
                    await axios.delete(`/api/board/comment/${commentId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    fetchPost();
                    Swal.fire(
                        "삭제 완료!",
                        "댓글이 삭제되었습니다.",
                        "success"
                    );
                } catch (error) {
                    console.error("Error", error);
                    Swal.fire(
                        "삭제 실패!",
                        "댓글 삭제에 실패했습니다.",
                        "error"
                    );
                } finally {
                    setLoading((prev) => ({ ...prev, [commentId]: false })); // 로딩 종료
                }
            }
        });
    };

    const handleKeyDown = async (event, commentId) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // 폼 제출 방지
            await handleUpdateSubmit(commentId); // 수정 제출 함수 호출
        }
    };

    // handleUpdateStart와 handleUpdateSubmit 함수는 로직이 동일하므로 여기에 로딩 상태 코드를 추가하지 않음

    const handleLike = async (commentId) => {
        setLoading((prev) => ({ ...prev, [commentId]: true })); // 로딩 시작
        try {
            await axios.post(
                `/api/board/comment/${commentId}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            fetchPost();
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading((prev) => ({ ...prev, [commentId]: false })); // 로딩 종료
        }
    };

    return (
        <>
            <div className={style.commentBox}>
                {sortedComments.map((comment) => (
                    <div key={comment.commentId} className={style.commentItem}>
                        <div className={style.commentUserId}>
                            {comment.userId}
                        </div>
                        {isUpdating[comment.commentId] ? (
                            <input
                                className={style.editInput}
                                type="text"
                                value={updatedContent[comment.commentId]}
                                onChange={(e) =>
                                    setUpdatedContent({
                                        ...updatedContent,
                                        [comment.commentId]: e.target.value,
                                    })
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, comment.commentId)
                                }
                            />
                        ) : (
                            <div className={style.commentContent}>
                                {comment.commentContents}
                            </div>
                        )}
                        <div className={style.commentActions}>
                            {loading[comment.commentId] ? (
                                <Loading />
                            ) : (
                                <>
                                    <span className={style.commentCreatedDate}>
                                        {FormatDatetime(
                                            comment.commentCreatedDate
                                        )}
                                    </span>
                                    <span className={style.commentLikes}>
                                        좋아요: {comment.commentLikes}
                                    </span>
                                    <button
                                        className={style.like_Button}
                                        onClick={() =>
                                            handleLike(comment.commentId)
                                        }
                                    >
                                        좋아요
                                    </button>
                                    {userId === comment.userId ? (
                                        <>
                                            {isUpdating[comment.commentId] ? (
                                                <button
                                                    className={
                                                        style.updateSubmitButton
                                                    }
                                                    onClick={() =>
                                                        handleUpdateSubmit(
                                                            comment.commentId
                                                        )
                                                    }
                                                >
                                                    수정완료
                                                </button>
                                            ) : (
                                                <button
                                                    className={
                                                        style.updateButton
                                                    }
                                                    onClick={() =>
                                                        handleUpdateStart(
                                                            comment.commentId
                                                        )
                                                    }
                                                >
                                                    수정
                                                </button>
                                            )}
                                            <button
                                                className={style.delete_Button}
                                                onClick={() =>
                                                    handleDelete(
                                                        comment.commentId
                                                    )
                                                }
                                            >
                                                삭제
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className={style.updateButton}
                                                disabled
                                            >
                                                수정
                                            </button>
                                            <button
                                                className={style.delete_Button}
                                                disabled
                                            >
                                                삭제
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comment;
