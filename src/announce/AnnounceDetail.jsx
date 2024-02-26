import React, { useEffect, useState, useCallback } from "react";
import style from "./AnnounceDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatDate from "./FormatDate";
import Sidenav from "../sidenav/Sidenav";
import Wrapper from "../pagechange/Wrapper";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AnnounceDetail() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const { announceId } = useParams();
    console.log("announcedetail");
    console.log(announceId);

    const [post, setPost] = useState(null);

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(
                `/api/announce/in-ctgr/${announceId}`
            );

            if (response.status === 200) {
                const post = response.data;
                setPost(post);
            } else if (response.status === 404) {
                console.error("요청이 실패했습니다.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }, [announceId]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: "게시글 삭제",
            text: "게시글을 삭제하시면 복구할 수 없습니다. 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제하기",
        }).then(async (result) => {
            // async 추가
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/announce/${announceId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    Swal.fire(
                        "삭제 완료",
                        "게시글이 삭제되었습니다.",
                        "success"
                    );
                    navigate("/announce");
                } catch (error) {
                    console.error("Error", error);
                    Swal.fire(
                        "Failed!",
                        "There was a problem deleting your post.",
                        "error"
                    );
                }
            }
        });
    };

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
                                                post.announceCreatedDate
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
                                            {/* {post.announceContents} */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: post.announceContents,
                                                }}
                                            />
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
                                <button
                                    className={style.announce_delete_btn}
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    );
}

export default AnnounceDetail;