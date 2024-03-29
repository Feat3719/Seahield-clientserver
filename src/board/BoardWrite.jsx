import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BoardWrite.module.css";
import axios from "axios";
import Editor from "./Editor";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "../sidenav/Sidenav";
import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";

function BoardWrite() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);

    // const tabName = queryParams.get("tabName");
    // const ctgr = queryParams.get("category");
    // const { tabName, ctgr } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    // const [category, setCategory] = useState(queryParams.get("category"));
    const [content, setContent] = useState("");

    // setCategory(ctgr);

    useEffect(() => { }, [content]);

    const handleWrite = async () => {
        if (category === "") {
            Swal.fire({
                title: "분류를 선택해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }

        Swal.fire({
            title: "등록하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "작성",
            cancelButtonText: "취소",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                // User clicked '작성', proceed with the write operation
                submitPost();
            }
        });
    };

    const submitPost = async () => {
        try {
            const response = await axios.post(
                "/api/board/article",
                {
                    articleTitle: title,
                    articleCtgr: category,
                    articleContents: content,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (response.status === 201) {
                navigate("/boardtab");
            } else if (response.status === 404) {
                // console.error("요청이 실패했습니다.");
            }
        } catch (error) {
            // console.error("Error", error);
        }
    };

    return (
        <div id={style.boardWriteContainer}>
            <div className={style.login_nav}>
                <Sidenav />
            </div>
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
                        {/* <div>분류 : {tabName}</div> */}
                        <select
                            className={style.select}
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                분류
                            </option>
                            <option value="FREE">자유게시판</option>
                            <option value="QNA">질문게시판</option>
                            <option value="NOTICE">공지사항</option>
                        </select>
                    </div>
                </div>

                <div className={style.editor}>
                    <Editor content={content} setContent={setContent} />
                </div>
            </div>
            <div id={style.button_box}>
                <div className={style.buttons}>
                    <button
                        className={style.complete_button}
                        onClick={handleWrite}
                    >
                        작성완료
                    </button>
                    <Link to={"/boardtab"}>
                        <button className={style.cancle_button}>취소</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;
