import React, { useEffect, useState, useCallback } from "react";
import style from "./AnnounceDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormatDate from "./FormatDatetime";
// import { useSelector } from "react-redux";
// import Comment from "./Comment";

function AnnounceDetail() {
    // const accessToken = useSelector((state) => state.auth.accessToken);
    // const userId = useSelector((state) => state.auth.user);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    // const [comments, setComments] = useState("");
    // const [isLiked, setIsLiked] = useState(false);

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`/api/announce/in-ctgr/${id}`);

            if (response.status === 200) {
                const post = response.data;
                setPost(post);
            } else if (response.status === 404) {
                console.error("요청이 실패했습니다.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    // const navigate = useNavigate();

    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`/api/board/article/${id}`);
    //         navigate("/boardtab");
    //     } catch (error) {
    //         console.error("Error", error);
    //     }
    // };

    // const handleLike = async () => {
    //     try {
    //         await axios.post(
    //             `/api/board/article/${id}/like`,
    //             {},
    //             {
    //                 headers: { Authorization: `Bearer ${accessToken}` },
    //             }
    //         );
    //         setIsLiked(!isLiked);
    //         fetchPost();
    //     } catch (error) {
    //         console.error("Error", error);
    //     }
    // };

    // const handleComment = async () => {
    //     try {
    //         await axios.post(
    //             "/api/board/comment",
    //             {
    //                 commentContents: comments,
    //                 articleId: id,
    //             },
    //             {
    //                 headers: { Authorization: `Bearer ${accessToken}` },
    //             }
    //         );
    //         fetchPost();
    //         setComments("");
    //     } catch (error) {
    //         console.error("Error", error);
    //     }
    // };

    return (
        post && (
            <div id={style.announceDetailContainer}>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>공고 상세</div>
                </div>
                <div id={style.detailBox}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th colSpan={8} className={style.number}>
                                    {post.announceId}
                                </th>
                                <th colSpan={8} className={style.title}>
                                    {post.announceName}
                                </th>
                                <th colSpan={8} className={style.writer}>
                                    {FormatDate(post.aanounceCreatedDate)}
                                </th>
                            </tr>
                            {/* <tr>
                                <th colSpan={4} className={style.category}>
                                    분류
                                </th>
                                <td
                                    colSpan={4}
                                    className={style.category_blank}
                                >
                                    {post.articleCtgr}
                                </td>
                                <th colSpan={4} className={style.reads}>
                                    조회수
                                </th>
                                <td colSpan={4} className={style.reads_blank}>
                                    {post.articleViewCount}
                                </td>
                                <th colSpan={4} className={style.like}>
                                    <button
                                        className={style.likeButton}
                                        onClick={handleLike}
                                    >
                                        좋아요

                                    </button>
                                </th>
                                <td colSpan={4} className={style.like_blank}>
                                    {post.articleLikes}
                                </td>
                            </tr> */}
                            <tr>
                                <th colSpan={4} className={style.creDate}>
                                    입찰시작일
                                </th>
                                <td colSpan={8} className={style.creDate_blank}>
                                    {FormatDate(post.biddingStartDate)}
                                </td>
                                <th colSpan={4} className={style.updateDate}>
                                    입찰종료일
                                </th>
                                <td
                                    colSpan={8}
                                    className={style.updateDate_blank}
                                >
                                    {FormatDate(post.biddingEndDate)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.content} colSpan={24}>
                                    {post.announceContents}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div id={style.button_box}>
                    <div id={style.buttons}>
                        <Link to="/announce">
                            <button className={style.list_button}>목록</button>
                        </Link>
                        {/* 
                        <Link to={`/boardupdate/${id}`}>
                            <button className={style.update_button}>
                                수정
                            </button>
                        </Link>

                        <button
                            className={style.delete_button}
                            onClick={handleDelete}
                        >
                            삭제
                        </button> */}
                    </div>
                </div>
                {/* <div id={style.comment_box}>
                    <div id={style.comment}>
                        <div className={style.inputBox}>
                            <input
                                className={style.input}
                                type="text"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                            <button
                                className={style.inputButton}
                                onClick={handleComment}
                            >
                                댓글 작성
                            </button>
                        </div>
                        <div className={style.commentListBox}>
                            <Comment
                                comments={post.comments}
                                fetchPost={fetchPost}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        )
    );
}

export default AnnounceDetail;
