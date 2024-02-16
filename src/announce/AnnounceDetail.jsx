import React, { useEffect, useState, useCallback } from "react";
import style from "./AnnounceDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatDate from "./FormatDatetime";
import Sidenav from "../sidenav/Sidenav";

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
            <div id={style.announceDetailContainer}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>공고 상세</div>
                </div>
                <div id={style.detailBox}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th colSpan={8} className={style.number}>
                                    {post.announceId}
                                </th>
                                <th colSpan={8} className={style.title}>
                                    {post.announceName}
                                </th>
                                <th colSpan={8} className={style.writer}>
                                    {FormatDate(post.aanounceCreatedDate)}
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={4} className={style.creDate}>
                                    입찰시작일
                                </th>
                                <td colSpan={8} className={style.creDate_blank}>
                                    {FormatDate(post.biddingStartDate)}
                                </td>
                                <th colSpan={4} className={style.updateDate}>
                                    입찰종료일
                                </th>
                                <td
                                    colSpan={8}
                                    className={style.updateDate_blank}
                                >
                                    {FormatDate(post.biddingEndDate)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.content} colSpan={24}>
                                    {post.announceContents}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div id={style.button_box}>
                    <div id={style.buttons}>
                        <Link to="/announce">
                            <button className={style.list_button}>목록</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    );
}

export default AnnounceDetail;
