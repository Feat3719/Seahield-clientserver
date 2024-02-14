import React, { useState } from "react";
import style from "./Comment.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Comment = ({ comments, fetchPost }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const sortedComments = [...comments].sort(
        (a, b) => b.commentId - a.commentId
    );

    const [isUpdating, setIsUpdating] = useState({});
    const [updatedContent, setUpdatedContent] = useState({});

    // const [checkedComments, setCheckedComments] = useState({});

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/api/board/comment/${commentId}`);
            fetchPost();
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleUpdate = async (commentId) => {
        try {
            await axios.patch(`/api/board/comment/${commentId}`, {
                commentContents: updatedContent[commentId],
            });
            fetchPost();
            setIsUpdating({ ...isUpdating, [commentId]: false });
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleLike = async (commentId) => {
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
        }
    };

    return (
        <>
            <div className={style.comment}>
                {sortedComments.map((comment) => (
                    <div key={comment.commentId} className={style.content}>
                        {/* <input // 각 댓글에 체크박스를 추가합니다.
                            type="checkbox"
                            onChange={(e) => {
                                setCheckedComments({
                                    ...checkedComments,
                                    [comment.commentId]: e.target.checked,
                                });
                            }}
                        /> */}
                        {isUpdating[comment.commentId] ? (
                            <input
                                type="text"
                                value={updatedContent[comment.commentId]}
                                onChange={(e) =>
                                    setUpdatedContent({
                                        ...updatedContent,
                                        [comment.commentId]: e.target.value,
                                    })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleUpdate(comment.commentId);
                                    }
                                }}
                            />
                        ) : (
                            comment.commentContents
                        )}
                        <div className={style.commentLikesBox}>
                            <div className={style.commentLikes}>
                                {comment.commentLikes}
                            </div>
                            <button
                                onClick={() => handleLike(comment.commentId)}
                            >
                                좋아요
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setIsUpdating({
                                        ...isUpdating,
                                        [comment.commentId]: true,
                                    });
                                    setUpdatedContent({
                                        ...updatedContent,
                                        [comment.commentId]:
                                            comment.commentContents,
                                    });
                                }}
                            >
                                수정
                            </button>
                            <button
                                onClick={() => handleDelete(comment.commentId)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
                {/* <button // 체크된 댓글에 대해 좋아요 기능을 적용하는 버튼을 추가합니다.
                    onClick={() => {
                        Object.keys(checkedComments).forEach((commentId) => {
                            if (checkedComments[commentId]) {
                                handleLike(commentId);
                            }
                        });
                    }}
                >
                    좋아요
                </button>
                <button // 체크된 댓글에 대해 수정 기능을 적용하는 버튼을 추가합니다.
                    onClick={() => {
                        Object.keys(checkedComments).forEach((commentId) => {
                            if (checkedComments[commentId]) {
                                setIsUpdating({
                                    ...isUpdating,
                                    [commentId]: true,
                                });
                            }
                        });
                    }}
                >
                    수정
                </button>
                <button // 체크된 댓글에 대해 삭제 기능을 적용하는 버튼을 추가합니다.
                    onClick={() => {
                        Object.keys(checkedComments).forEach((commentId) => {
                            if (checkedComments[commentId]) {
                                handleDelete(commentId);
                            }
                        });
                    }}
                >
                    삭제
                </button> */}
            </div>
        </>
    );
};

export default Comment;
