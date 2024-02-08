import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BoardWrite.module.css";
import axios from "axios";
import Editor from "./Editor";

function BoardWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const handleWrite = async () => {
        try {
            console.log(title);
            console.log(category);
            console.log(content);
            await axios.post("/api/board/article", {
                articleTitle: title,
                articleCtgr: category,
                articleContents: content,
            });
            navigate("/boardlist");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div id={style.container}>
            <div id={style.pagetitle_box}>
                <div className={style.pagetitle}>게시글 작성</div>
            </div>
            <div id={style.write_box}>
                <div id={style.flex_box}>
                    <div className={style.title}>
                        <input
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
                    <Editor setEditorData={setContent} />
                    <textarea value={content} />
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
