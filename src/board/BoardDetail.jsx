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
import Swal from "sweetalert2";
import ReactAnimatedHeart from "react-animated-heart";
import Loading from "../loading/Loading";

function BoardDetail() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const categoryNames = {
        FREE: "자유게시판",
        QNA: "질문게시판",
        NOTICE: "공지사항",
    };

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`/api/board/article/${id}`);
            const post = response.data;
            setPost(post);
        } catch (error) {
            // console.error("Error", error);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: "게시글 삭제",
            text: "게시글을 삭제하시면 복구할 수 없습니다. 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제하기",
        }).then(async (result) => {
            // async 추가
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/board/article/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    Swal.fire(
                        "삭제 완료",
                        "게시글이 삭제되었습니다.",
                        "success"
                    );
                    navigate("/boardtab");
                } catch (error) {
                    // console.error("Error", error);
                    Swal.fire(
                        "Failed!",
                        "There was a problem deleting your post.",
                        "error"
                    );
                }
            }
        });
    };

    const handleLike = async () => {
        setIsLiking(true); // 로딩 시작
        try {
            await axios.post(
                `/api/board/article/${id}/like`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            // 'isLiked' 상태를 토글하기 전에 로딩을 시작합니다.
            setIsLiked(!isLiked); // 좋아요 상태 토글
            fetchPost(); // 포스트를 다시 가져옵니다.
        } catch (error) {
            // console.error("Error", error);
        } finally {
            setIsLiking(false); // 로딩 종료
        }
    };

    const handleComment = async () => {
        setIsSubmitting(true); // 로딩 시작
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
            fetchPost(); // 글을 다시 불러와서 댓글을 최신 상태로 갱신
            setComments(""); // 입력 필드 초기화
        } catch (error) {
            // console.error("Error", error);
        } finally {
            setIsSubmitting(false); // 로딩 종료
        }
    };

    // 엔터 키 입력 감지 함수
    const handleKeyDown = async (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // 기본 동작 방지 (폼 제출 등)
            await handleComment(); // 댓글 작성 함수 호출
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
                                <th className={style.number}></th>
                                <th className={style.title}></th>
                                <th className={style.creDate}>
                                    작성일 :{" "}
                                    {FormatDatetime(post.articleCreatedDate)}
                                </th>
                                <td className={style.fixDate}>
                                    수정일:{" "}
                                    {FormatDatetime(post.articleUpdateDate)}
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
                        <div className={style.heart}>
                            {/* 로딩 상태와 상관없이 'isLiked' 상태에 따라 하트를 표시합니다. */}
                            <ReactAnimatedHeart
                                isClick={isLiked}
                                onClick={handleLike}
                            />
                            {isLiking && <Loading />}{" "}
                            {/* 로딩 상태일 때만 로딩 컴포넌트를 표시합니다. */}
                            <div className={style.articleLikes}>
                                {post.articleLikes}
                            </div>
                        </div>

                        <Link to="/boardtab">
                            <button className={style.list_button}>목록</button>
                        </Link>
                        {post.userId === userId ? (
                            <>
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
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div id={style.comment_box}>
                    <div id={style.comment}>
                        <div className={style.inputBox}>
                            <p className={style.comment}>댓글</p>
                            <input
                                className={style.input}
                                type="text"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className={style.inputButton}
                                onClick={handleComment}
                            >
                                {isSubmitting ? <Loading /> : "작성하기"}
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
