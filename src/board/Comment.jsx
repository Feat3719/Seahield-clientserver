import React, { useState } from "react";
import style from "./Comment.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import FormatDatetime from "./FormatDatetime";

const Comment = ({ comments, fetchPost }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
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

    const [checkedComment, setCheckedComment] = useState(null);

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
            setCheckedComment(null);
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
            setCheckedComment(null);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <>
            <div className={style.commentBox}>
                {sortedComments.map((comment) => (
                    <div key={comment.commentId} className={style.content}>
                        <input
                            className={style.checkbox}
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckedComment(comment.commentId);
                                } else {
                                    setCheckedComment(null);
                                }
                            }}
                            checked={checkedComment === comment.commentId}
                        />
                        {isUpdating[comment.commentId] ? (
                            <input
                                className={comment}
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
                        <div className={style.commentLikes}>
                            {comment.commentLikes}
                        </div>
                        <div>
                            <div className={style.commentCreatedDate}>
                                {FormatDatetime(comment.commentCreatedDate)}
                            </div>
                        </div>
                        <div className={style.commentUserId}>
                            <div>{comment.userId}</div>
                        </div>
                    </div>
                ))}

                <div className={style.buttons}>
                    <button
                        className={style.like_button}
                        onClick={() => {
                            if (checkedComment) {
                                handleLike(checkedComment);
                            }
                        }}
                    >
                        좋아요
                    </button>
                    <button
                        className={style.update_button}
                        onClick={() => {
                            if (checkedComment) {
                                setIsUpdating({
                                    ...isUpdating,
                                    [checkedComment]: true,
                                });
                                setUpdatedContent({
                                    ...updatedContent,
                                    [checkedComment]: comments.find(
                                        (comment) =>
                                            comment.commentId === checkedComment
                                    ).commentContents,
                                });
                            }
                        }}
                    >
                        수정
                    </button>

                    <button
                        className={style.delete_button}
                        onClick={() => {
                            if (checkedComment) {
                                handleDelete(checkedComment);
                            }
                        }}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
};

export default Comment;
