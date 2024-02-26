import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AnnounceWrite.module.css";
import axios from "axios";
import Editor from "../board/Editor";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "../sidenav/Sidenav";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

function AnnounceWrite() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // const tabName = queryParams.get("tabName");

    const navigate = useNavigate();

    const [announceId, setAnnounceId] = useState("");
    const [announceName, setAnnounceName] = useState("");
    const [announceContents, setAnnounceContents] = useState("");
    const [biddingStartDate, setBiddingStartDate] = useState("");
    const [biddingEndDate, setBiddingEndDate] = useState("");

    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다. 두 자리 숫자를 유지하기 위해 slice를 사용합니다.
    const day = ("0" + today.getDate()).slice(-2); // 두 자리 숫자를 유지하기 위해 slice를 사용합니다.

    const currentDate = `${year}-${month}-${day}`;

    const [category] = useState(queryParams.get("category"));

    useEffect(() => { }, [announceContents]);

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
                "/api/announce/",
                {
                    announceId: announceId,
                    announceName: announceName,
                    announceContents: announceContents,
                    biddingStartDate: biddingStartDate,
                    biddingEndDate: biddingEndDate,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (response.status === 200) {
                navigate("/announce");
            } else if (response.status === 404) {
                // console.error("요청이 실패했습니다.");
            }
        } catch (error) {
            // console.error("Error", error);
        }
    };

    return (
        <div id={style.announceWriteContainer}>
            <div className={style.login_nav}>
                <Sidenav />
            </div>
            <div id={style.pageTitleBox}>
                <div className={style.pageTitle}>공고 작성</div>
            </div>
            <div id={style.write_box}>
                <div id={style.flex_box}>
                    <div className={style.announceId}>
                        <input
                            className={style.input}
                            name="announceId"
                            type="text"
                            value={announceId}
                            id="announceId"
                            placeholder="공고번호"
                            onChange={(e) => setAnnounceId(e.target.value)}
                        ></input>
                    </div>
                    <div className={style.announceName}>
                        <input
                            className={style.input}
                            name="announceName"
                            type="text"
                            value={announceName}
                            id="announceName"
                            placeholder="제목"
                            onChange={(e) => setAnnounceName(e.target.value)}
                        ></input>
                    </div>
                    <div className={style.biddingStartDate}>
                        <label for="biddingStartDate">입찰시작일</label>
                        <input
                            className={style.input}
                            name="biddingStartDate"
                            type="date"
                            value={biddingStartDate}
                            id="biddingStartDate"
                            min={currentDate}
                            onChange={(e) =>
                                setBiddingStartDate(e.target.value)
                            }
                        ></input>
                    </div>
                    <div className={style.biddingEndDate}>
                        <label for="biddingEndDate">입찰마감일</label>
                        <input
                            className={style.input}
                            name="biddingEndDate"
                            type="date"
                            value={biddingEndDate}
                            id="biddingEndDate"
                            min={biddingStartDate}
                            onChange={(e) => setBiddingEndDate(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className={style.editor}>
                    <Editor
                        content={announceContents}
                        setContent={setAnnounceContents}
                    />
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
                    <Link to={"/announce"}>
                        <button className={style.cancle_button}>취소</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AnnounceWrite;
