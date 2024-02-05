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
                setPost(response.data);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.patch(`/api/board/article/${id}`, {
                qnaArticleTitle: title,
                qnaArticleCtgr: category,
                qnaArticleContents: content,
            });
            navigate(`/boarddetail/${id}`);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        post && (
            <div id={style.container}>
                <div id={style.detail_box}>
                    <table>
                        <thead>
                            <tr>
                                <th className={style.number}>
                                    {post.qnaArticleId}
                                </th>
                                <th colSpan={5} className={style.title}>
                                    <input
                                        name="title"
                                        type="text"
                                        defaultValue={post.qnaArticleTitle}
                                        id="title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></input>
                                </th>
                                <th className={style.writer}>{post.userId}</th>
                            </tr>
                            <tr>
                                <th className={style.category}>분류</th>
                                <td
                                    colSpan={3}
                                    className={style.category_blank}
                                >
                                    <input
                                        name="category"
                                        defaultValue={post.qnaArticleCtgr}
                                        id="category"
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    ></input>
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
                                    <textarea
                                        name="content"
                                        id="content"
                                        cols="30"
                                        rows="10"
                                        defaultValue={post.qnaArticleContents}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>작성일</th>
                                <td colSpan={3}>
                                    {FormatDatetime(post.qnaArticleCreatedDate)}
                                </td>
                                <th colSpan={2}>수정일</th>
                                <td>
                                    {FormatDatetime(post.qnaArticleUpdateDate)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div id={style.button_box}>
                    <button
                        className={style.complete_button}
                        onClick={handleUpdate}
                    >
                        수정완료
                    </button>
                </div>
            </div>
        )
    );
}

export default BoardUpdate;
