import React from "react";

const Comment = ({ comments }) => {
    return (
        <>
            {comments.map((comment) => (
                <div key={comment.commentId}>
                    {comment.commentContents}
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            ))}
        </>
    );
};

export default Comment;
