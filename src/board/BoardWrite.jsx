import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BoardWrite.module.css";
import axios from "axios";

function BoardWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const handleWrite = async () => {
        try {
            await axios.post("/api/board/article", {
                qnaArticleTitle: title,
                qnaArticleCtgr: category,
                qnaArticleContents: content,
            });
            navigate("/boardlist");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div id={style.container}>
            <div id={style.write_box}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="category">분류</label>
                    <input
                        name="category"
                        value={category}
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <div id={style.button_box}>
                <button className={style.complete_button} onClick={handleWrite}>
                    작성완료
                </button>
            </div>
        </div>
    );
}

export default BoardWrite;
