import React, { useEffect, useState } from "react";
import style from "./BoardDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            const response = await axios.delete(`/api/board/article/${id}`);
            console.log(response.data);
            navigate("/boardlist");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div id={style.container}>
            <div id={style.detail_box}>
                <table>
                    <thead>
                        <tr>
                            <th className={style.number}>{post.qnaBoardId}</th>
                            <th colSpan={5} className={style.title}>
                                {post.qnaBoardTitle}
                            </th>
                            <th className={style.writer}>
                                {post.qnaBoardWriter}
                            </th>
                        </tr>
                        <tr>
                            <th className={style.category}>분류</th>
                            <td colSpan={3} className={style.category_blank}>
                                {post.qnaBoardCtgr}
                            </td>
                            <th colSpan={2} className={style.reads}>
                                조회수
                            </th>
                            <td className={style.reads_blank}>
                                {post.qnaBoardViewCounts}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.content} colSpan={7}>
                                {post.qnaBoardContents}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>작성일</th>
                            <td colSpan={3}>{post.qnaBoardCreatedDate}</td>
                            <th colSpan={2}>수정일</th>
                            <td>{post.qnaBoardUpdateDate}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div id={style.button_box}>
                <Link to="/boardupdate">
                    <button className={style.update_button}>수정</button>
                </Link>

                <button className={style.delete_button} onClick={handleDelete}>
                    삭제
                </button>

                {/* <button className={style.comment_button}>댓글달기</button> */}
            </div>
            <div id={style.comment_box}>댓글</div>
        </div>
    );
}

export default BoardDetail;
