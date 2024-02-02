import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BoardWrite.module.css";
import axios from "axios";

function BoardWrite() {
    const navigete = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const handleWrite = async () => {
        try {
            await axios.post("/api/board/article", {
                qnaBoardTitle: title,
                qnaBoardCtgr: category,
                qnaBoardContents: content,
            });
            navigete("/boardlist");
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div id={style.container}>
            <div id={style.write_box}>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <input
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></input>
                <textarea
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
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
