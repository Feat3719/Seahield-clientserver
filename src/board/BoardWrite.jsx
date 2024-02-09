import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BoardWrite.module.css";
import axios from "axios";
import Editor from "./Editor";
import { useSelector } from "react-redux";

function BoardWrite() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        console.log(content);
    }, [content]);

    const handleWrite = async () => {
        try {
            console.log(title);
            console.log(category);
            console.log(content);
            await axios.post("/api/board/article", {
                articleTitle: title,
                articleCtgr: category,
                articleContents: content,
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`} 
            });
            navigate("/boardtab");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div id={style.boardWriteContainer}>
            <div id={style.pageTitleBox}>
                <div className={style.pageTitle}>게시글 작성</div>
            </div>
            <div id={style.write_box}>
                <div id={style.flex_box}>
                    <div className={style.title}>
                        <input
                            className={style.input}
                            name="title"
                            type="text"
                            value={title}
                            id="title"
                            placeholder="제목"
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className={style.category}>
                        <select
                            className={style.select}
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>
                                분류
                            </option>
                            <option value="FREE">자유게시판</option>
                            <option value="QNA">질문게시판</option>
                            <option value="NOTICE">공지사항</option>
                            <option value="ANNOUNCE">공고</option>
                        </select>
                    </div>
                </div>

                <div className={style.editor}>
                    <Editor content={content} setContent={setContent}/>

                </div>
            </div>
            <div id={style.button_box}>
                <div className={style.complete_button}>
                    <button className={style.button} onClick={handleWrite}>
                        작성완료
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BoardWrite;
