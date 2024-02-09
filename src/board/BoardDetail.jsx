import React, { useEffect, useState } from "react";
import style from "./BoardDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormatDatetime from "./FormatDatetime";

function BoardDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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
            navigate("/boardtab");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        post && (
            <div id={style.boardDetailContainer}>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>게시글 수정</div>
                </div>
                <div id={style.detailBox}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th className={style.number}>
                                    {post.articleId}
                                </th>
                                <th colSpan={5} className={style.title}>
                                    {post.articleTitle}
                                </th>
                                <th className={style.writer}>{post.userId}</th>
                            </tr>
                            <tr>
                                <th className={style.category}>분류</th>
                                <td
                                    colSpan={3}
                                    className={style.category_blank}
                                >
                                    {post.articleCtgr}
                                </td>
                                <th colSpan={2} className={style.reads}>
                                    조회수
                                </th>
                                <td className={style.reads_blank}>
                                    {post.articleViewCounts}
                                </td>
                            </tr>
                            <tr>
                                <th>작성일</th>
                                <td colSpan={3}>
                                    {FormatDatetime(post.articleCreatedDate)}
                                </td>
                                <th colSpan={2}>수정일</th>
                                <td>
                                    {FormatDatetime(post.articleUpdateDate)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.content} colSpan={7}>
                                    {post.articleContents}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
                <div id={style.button_box}>
                    <div id={style.buttons}>
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
                    </div>

                </div>
                <div id={style.comment_box}>댓글</div>
            </div>
        )
    );
}

export default BoardDetail;
