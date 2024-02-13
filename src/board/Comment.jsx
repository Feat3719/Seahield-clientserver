import React from "react";

const Comment = ({ comments }) => {
    const sortedComments = [...comments].sort((a, b) => b.commentId - a.commentId);

    return (
        <>
            {sortedComments.map((comment) => (
                <div key={comment.commentId} className="comment">
                    {comment.commentContents}
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            ))}
        </>
    );
};

export default Comment;
