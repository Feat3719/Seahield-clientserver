import React, { useEffect, useState, useCallback } from "react";
import style from "./BoardDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormatDatetime from "./FormatDatetime";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import Sidenav from "../sidenav/Sidenav";
import Swal from 'sweetalert2';

function BoardDetail() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    // const userId = useSelector((state) => state.auth.user);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    const categoryNames = {
        FREE: '자유게시판',
        QNA: '질문게시판',
        NOTICE: '공지사항',
    };

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`/api/board/article/${id}`);
            const post = response.data;
            setPost(post);
        } catch (error) {
            console.error("Error", error);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: '게시글 삭제',
            text: "게시글을 삭제하시면 복구할 수 없습니다. 삭제하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제하기'
        }).then(async (result) => { // async 추가
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/board/article/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    Swal.fire('삭제 완료', '게시글이 삭제되었습니다.', 'success');
                    navigate("/boardtab");
                } catch (error) {
                    console.error("Error", error);
                    Swal.fire('Failed!', 'There was a problem deleting your post.', 'error');
                }
            }
        });
    };


    const handleLike = async () => {
        try {
            await axios.post(
                `/api/board/article/${id}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            setIsLiked(!isLiked);
            fetchPost();
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleComment = async () => {
        try {
            await axios.post(
                "/api/board/comment",
                {
                    commentContents: comments,
                    articleId: id,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            fetchPost();
            setComments("");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        post && (
            <div id={style.boardDetailContainer}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>게시글 상세</div>
                </div>
                <div id={style.detailBox}>
                    <table className={style.table}>
                        <thead>
                            <tr className={style.boarddetail_title}>
                                <th className={style.number}>
                                    글번호 : {post.articleId}
                                </th>
                                <th className={style.title}>
                                    제목 : {post.articleTitle}
                                </th>
                                <th className={style.writer}>
                                    작성자 : {post.userId}
                                </th>
                                <th className={style.category}>
                                    분류 : {categoryNames[post.articleCtgr]}
                                </th>
                            </tr>

                            <tr className={style.boarddetail_1}>
                                <th className={style.number}>
                                </th>
                                <th className={style.title}>
                                </th>
                                <th className={style.creDate}>
                                    작성일 : {FormatDatetime(post.articleCreatedDate)}
                                </th>
                                <td className={style.fixDate}>
                                    수정일: {FormatDatetime(post.articleUpdateDate)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={style.board_content}>
                                <td className={style.content} colSpan={24}>
                                    {/* {post.articleContents} */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.articleContents,
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div id={style.button_box}>

                    <div id={style.buttons}>
                        <button
                            className={style.likeButton}
                            onClick={handleLike}
                        >
                            좋아요
                            {/* <img
                                            className={style.imgHeart}
                                            src={
                                                isLiked
                                                    ? `${process.env.PUBLIC_URL}/images/filledHeart.svg`
                                                    : `${process.env.PUBLIC_URL}/images/emptyHeart.svg`
                                            }
                                        /> */}
                        </button>

                        {post.articleLikes}





                        <Link to="/boardtab">
                            <button className={style.list_button}>목록</button>
                        </Link>

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
                        </button>
                    </div>
                </div>
                <div id={style.comment_box}>
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
                </div>
            </div>
        )
    );
}

export default BoardDetail;
