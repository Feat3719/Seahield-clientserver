import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./BoardUpdate.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormatDatetime from "./FormatDatetime";

function BoardUpdate() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/board/article/${id}`);
                const post = response.data;
                setPost(post);

                setTitle(post.articleTitle);
                setCategory(post.articleCtgr);
                setContent(post.articleContents);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.patch(`/api/board/article/${id}`, {
                articleTitle: title,
                articleCtgr: category,
                articleContents: content,
            });
            navigate(`/boarddetail/${id}`);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        post && (
            <div id={style.boardUpdateContainer}>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>게시글 수정</div>
                </div>
                <div id={style.updateBox}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th colSpan={8} className={style.number}>
                                    {post.articleId}
                                </th>
                                <th colSpan={8} className={style.title}>
                                    <input
                                        name="title"
                                        type="text"
                                        value={title}
                                        id="title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></input>
                                </th>
                                <th colSpan={8} className={style.writer}>
                                    {post.userId}
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={4} className={style.category}>
                                    분류
                                </th>
                                <td
                                    colSpan={4}
                                    className={style.category_blank}
                                >
                                    {/* <input
                                        name="category"
                                        value={category}
                                        id="category"
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    ></input> */}
                                    <select
                                        className={style.select}
                                        name="category"
                                        id="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        {/* <option value="" disabled>
                                            분류
                                        </option> */}
                                        <option value="FREE">자유게시판</option>
                                        <option value="QNA">질문게시판</option>
                                        <option value="NOTICE">공지사항</option>
                                        <option value="ANNOUNCE">공고</option>
                                    </select>
                                </td>
                                <th colSpan={4} className={style.reads}>
                                    조회수
                                </th>
                                <td colSpan={4} className={style.reads_blank}>
                                    {post.articleViewCount}
                                </td>
                                <th colSpan={4} className={style.like}>
                                    좋아요
                                </th>
                                <td colSpan={4} className={style.like_blank}>
                                    {post.articleLikes}
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={4}>작성일</th>
                                <td colSpan={8}>
                                    {FormatDatetime(post.articleCreatedDate)}
                                </td>
                                <th colSpan={4}>수정일</th>
                                <td colSpan={8}>
                                    {FormatDatetime(post.articleUpdateDate)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={24} className={style.content}>
                                    <textarea
                                        name="content"
                                        id="content"
                                        cols="30"
                                        rows="10"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div id={style.buttonBox}>
                    <div id={style.updateButton}>
                        <button className={style.button} onClick={handleUpdate}>
                            수정완료
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default BoardUpdate;
