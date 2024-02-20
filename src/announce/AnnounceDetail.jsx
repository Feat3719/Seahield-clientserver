import React, { useEffect, useState, useCallback } from "react";
import style from "./AnnounceDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatDate from "./FormatDatetime";
import Sidenav from "../sidenav/Sidenav";
import Wrapper from "../pagechange/Wrapper";

function AnnounceDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`/api/announce/in-ctgr/${id}`);

            if (response.status === 200) {
                const post = response.data;
                setPost(post);
            } else if (response.status === 404) {
                console.error("요청이 실패했습니다.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return (
        post && (
            <Wrapper>
                <div id={style.announceDetailContainer}>
                    <div className={style.login_nav}>
                        <Sidenav />
                    </div>
                    <div id={style.pageTitleBox}>
                        <div className={style.pageTitle}>공고 상세</div>
                    </div>
                    <div id={style.detailBox}>
                        <div id={style.tableBox}>
                            <div className={style.table}>
                                <div className={style.thead}>
                                    <div className={style.row}>
                                        <div
                                            className={`${style.cell} ${style.number}`}
                                            style={{ gridColumn: "span 2" }}
                                        >
                                            {post.announceId}
                                        </div>
                                        <div
                                            className={`${style.cell} ${style.title}`}
                                            style={{ gridColumn: "span 8" }}
                                        >
                                            {post.announceName}
                                        </div>
                                        <div
                                            className={`${style.cell} ${style.writer}`}
                                            style={{ gridColumn: "span 2" }}
                                        >
                                            {FormatDate(
                                                post.aanounceCreatedDate
                                            )}
                                        </div>
                                    </div>
                                    <div className={style.row}>
                                        <div
                                            className={`${style.cell} ${style.creDate}`}
                                            style={{ gridColumn: "span 2" }}
                                        >
                                            입찰시작일
                                        </div>
                                        <div
                                            className={`${style.cell} ${style.creDate_blank}`}
                                            style={{ gridColumn: "span 4" }}
                                        >
                                            {FormatDate(post.biddingStartDate)}
                                        </div>
                                        {/* </div>
                                    <div className={style.row}>     */}
                                        <div
                                            className={`${style.cell} ${style.updateDate}`}
                                            style={{ gridColumn: "span 2" }}
                                        >
                                            입찰종료일
                                        </div>
                                        <div
                                            className={`${style.cell} ${style.updateDate_blank}`}
                                            style={{ gridColumn: "span 4" }}
                                        >
                                            {FormatDate(post.biddingEndDate)}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.tbody}>
                                    <div className={style.row}>
                                        <div
                                            className={`${style.cell} ${style.content}`}
                                            style={{ gridColumn: "span 12" }}
                                        >
                                            {post.announceContents}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id={style.button_box}>
                            <div id={style.buttons}>
                                <Link to="/announce" className={style.link}>
                                    <button className={style.announce_list_btn}>
                                        목록
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    );
}

export default AnnounceDetail;
