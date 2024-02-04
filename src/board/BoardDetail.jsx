import React, { useEffect, useState } from "react";
import style from "./BoardDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BoardDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    // const location = useLocation();
    // const initialPost = location.state ? location.state.post : {};
    // const [post, setPost] = useState(initialPost);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/board/article/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPost();
    }, [id]);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/board/article/${id}`);
            navigate("/boardlist");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        post && (
            <div id={style.container}>
                <div id={style.detail_box}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th className={style.number}>
                                    {post.qnaArticleId}
                                </th>
                                <th colSpan={5} className={style.title}>
                                    {post.qnaArticleTitle}
                                </th>
                                <th className={style.writer}>{post.userId}</th>
                            </tr>
                            <tr>
                                <th className={style.category}>분류</th>
                                <td
                                    colSpan={3}
                                    className={style.category_blank}
                                >
                                    {post.qnaArticleCtgr}
                                </td>
                                <th colSpan={2} className={style.reads}>
                                    조회수
                                </th>
                                <td className={style.reads_blank}>
                                    {post.qnaArticleViewCounts}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.content} colSpan={7}>
                                    {post.qnaArticleContents}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>작성일</th>
                                <td colSpan={3}>
                                    {post.qnaArticleCreatedDate}
                                </td>
                                <th colSpan={2}>수정일</th>
                                <td>{post.qnaArticleUpdateDate}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div id={style.button_box}>
                    <Link to="/boardlist">
                        <button className={style.list_button}>목록</button>
                    </Link>
                    <Link to={`/boardupdate/${id}`}>
                        <button className={style.update_button}>수정</button>
                    </Link>

                    <button
                        className={style.delete_button}
                        onClick={handleDelete}
                    >
                        삭제
                    </button>

                    {/* <button className={style.comment_button}>댓글달기</button> */}
                </div>
                <div id={style.comment_box}>댓글</div>
            </div>
        )
    );
}

export default BoardDetail;
